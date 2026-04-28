# CampusSync Mobile 2026 — Architectural Critique

> This is a direct, honest assessment. The goal is to save this project before it ships broken.

---

## 1. Identity Crisis: This Is Not a Mobile App

The single biggest problem: **this is a desktop admin dashboard template (`@minimal-kit/vite-js`) that has been renamed and given two extra routes.** The actual mobile work — Capacitor, native plugins, mobile UX — is almost entirely absent.

- [package.json](file:///home/qupc/projects/campussyncmobile2026/package.json) still declares `"name": "@minimal-kit/vite-js"` and `"author": "Minimals"`. The project's own name hasn't even been updated.
- The entire `src/` directory — 37 shared components, MUI data-grids, map components, org-charts, lightboxes, rich text editors — is inherited verbatim from the template and **unused by the app's actual 3 routes**.
- `@capacitor/core`, `@capacitor/android`, `@capacitor/cli` are listed as `dependencies`, yet there is **zero Capacitor plugin usage** anywhere in the source code. No `@capacitor/preferences`, `@capacitor/camera`, `@capacitor/network` — nothing that makes it actually *native*.
- The Android build exists in `/android` but is a Capacitor shell around a web app that hasn't been written yet.

**This is a template with ~95% dead code and a stub.**

---

## 2. Catastrophic Dependency Bloat

The `package.json` lists **88 production dependencies** for an app with 3 routes (splash → role selection → sign in).

| Installed & imported | Actually used |
|---|---|
| Firebase SDK | ❌ Not wired (auth method is `'jwt'`) |
| AWS Amplify | ❌ Not wired |
| Auth0 SDK | ❌ Not wired |
| Supabase JS | ❌ Not wired (auth method is `'jwt'`) |
| Mapbox GL + react-map-gl | ❌ No map screen exists |
| FullCalendar (6 packages) | ❌ No calendar screen exists |
| Tiptap (8 packages) | ❌ No editor screen exists |
| ApexCharts + react-apexcharts | ❌ No chart screen exists |
| `aws-amplify` **and** `firebase` **and** `@supabase/supabase-js` **and** `@auth0/auth0-react` | All four auth SDKs ship to every user's device while only JWT is active |

Every one of these SDKs ships to the user's mobile browser on the first load, massively inflating the bundle. On a real mobile network, this will be felt immediately.

> [!CAUTION]
> Shipping `firebase`, `aws-amplify`, `supabase-js`, and `auth0-react` all at once in a mobile app whose only living auth is JWT is indefensible. Remove three of them now.

---

## 3. Security Failures in the JWT Auth Layer

**`sessionStorage` is not safe storage for JWT access tokens.**

```js
// jwt/action.js
sessionStorage.setItem('user_role', role);

// jwt/auth-provider.jsx
const accessToken = sessionStorage.getItem(STORAGE_KEY);
const role = sessionStorage.getItem('user_role');
```

- `sessionStorage` is wiped on tab close — acceptable for persistence, but it's also **readable by any XSS payload** on the page. With 88 dependencies, the XSS surface area is enormous.
- `user_role` is stored as a plain string in `sessionStorage`. **The role is determined client-side** and sent to the server on login. Any user can open DevTools, set `sessionStorage['user_role'] = 'teacher'`, and the app will call the teacher endpoint instead of the parent endpoint on `checkUserSession`.

**`alert()` is used for token expiry:**

```js
// jwt/utils.js — tokenExpired()
setTimeout(() => {
  alert('Token expired!');  // A browser alert. In 2026. In a mobile app.
  sessionStorage.removeItem(STORAGE_KEY);
  window.location.href = paths.auth.jwt.signIn;
}, timeLeft);
```

This is a `setTimeout` set once at login time and **never cancelled**. If the user logs out and back in, multiple timers stack. On a long-lived session the timer drift is a real problem. Use `visibilitychange` + token re-check on focus instead.

> [!WARNING]
> Replace `alert()` with your existing `sonner` toast system. The `alert()` call will literally pause all JavaScript execution on mobile WebView.

---

## 4. Five Auth Providers, One Used, No Cleanup

`app.jsx` imports all five `AuthProvider` implementations and selects one via a runtime string comparison:

```js
const AuthProvider =
  (CONFIG.auth.method === 'amplify' && AmplifyAuthProvider) ||
  (CONFIG.auth.method === 'firebase' && FirebaseAuthProvider) ||
  (CONFIG.auth.method === 'supabase' && SupabaseAuthProvider) ||
  (CONFIG.auth.method === 'auth0' && Auth0AuthProvider) ||
  JwtAuthProvider;
```

All five modules are **statically imported and bundled** regardless of which one is active. This is a template convenience that carries real bundle cost in production. The unused four should be deleted from the project entirely.

---

## 5. Mock Data Leaking Into Production Paths

```js
// routes/paths.js
import { _id, _postTitles } from 'src/_mock/assets';

const MOCK_ID = _id[1];
const MOCK_TITLE = _postTitles[2];

export const paths = {
  product: {
    demo: { details: `/product/${MOCK_ID}` },   // mock ID in prod route config
  },
  post: {
    demo: { details: `/post/${paramCase(MOCK_TITLE)}` },  // mock title in prod route config
  },
  ...
```

This is template demo scaffolding that was never removed. `_mock/assets.js` is 23 KB of hardcoded fake data (avatar URLs, names, IDs) that is bundled into the production app and referenced from the canonical paths file.

---

## 6. Broken / Dead Nav Config

`config-nav-account.jsx` defines 6 navigation items. **Three of them link to `href: '#'`** — Profile, Projects, Subscription, Security, and Account Settings are all `#`. Only "Home" has a real destination. There is no profile page, no settings page, no account management implemented at all.

The `config-nav-main.jsx` is essentially empty (249 bytes — it likely exports an empty array or a single entry).

---

## 7. Route Guard Is Missing Entirely

The `/home` route has **zero authentication guard**. Any unauthenticated user who navigates directly to `/home` will land there without restriction. The `guard/` directory exists under `src/auth/` but it is not applied to any route in `src/routes/sections/index.jsx`. There is no `AuthGuard` wrapping the home route.

```jsx
// routes/sections/index.jsx
{
  path: 'home',
  element: (
    <Suspense fallback={<SplashScreen />}>
      <SimpleLayout>
        <HomePage />   {/* ← no AuthGuard */}
      </SimpleLayout>
    </Suspense>
  ),
},
```

---

## 8. The Login Form Has Half-Implemented Phone Auth

The `LoginView` has a "Phone Number" tab and `PhoneLoginSchema`, but:

```js
// action.js
const params = {
  email: identifier,   // ← phone number is passed as "email" field
  password,
  role,
  ...(phoneNumber && { phone: phoneNumber }),
};
```

The phone number is passed as **both** `email` (because `identifier = email || phoneNumber`) and `phone`. The server receives the phone number in the `email` field. This is either a backend assumption that will silently break or a bug waiting to surface.

The "Forgot password?" link and "Create an account" link are both dead (`href` is missing or `#`).

---

## 9. The Splash Screen Is a Hard-Coded 3-Second Timer

```js
// routes/sections/index.jsx
useEffect(() => {
  const timer = setTimeout(() => {
    setShowSplash(false);
  }, 3000); // 3 seconds splash
}, []);
```

The splash screen has no relationship with actual readiness — auth session check, asset load, nothing. It's a pure delay. On a fast device the user waits 3 seconds staring at a logo for no reason. On a slow device, the app may actually not be ready after 3 seconds. This should be tied to `loading` from `useAuthContext`.

---

## 10. Tauri Is Also Installed

`src-tauri/` exists and `"tauri": "^2.0.0"` is in dependencies alongside `@capacitor/android`. **This project is simultaneously a Tauri desktop app and a Capacitor mobile app.** These are mutually exclusive deployment targets with fundamentally different native bridges. There is no scenario where both are needed. One of them is dead weight.

---

## Summary Scorecard

| Area | Grade | Notes |
|---|---|---|
| Codebase completeness | **F** | 3 routes implemented out of an entire school platform |
| Security | **D** | `sessionStorage` tokens, `alert()` expiry, no route guards |
| Bundle size discipline | **F** | ~88 deps, 4 unused auth SDKs, 23KB mock data in prod |
| Mobile-native integration | **D** | Capacitor installed, zero native API usage |
| Auth implementation | **C** | JWT works but role is client-controlled and phone login is broken |
| Code cleanliness | **D** | Template name unchanged, dead links, 5 providers loaded |
| Architecture clarity | **C** | Pattern is sound (context + hooks + SWR), but buried under template noise |

---

## Priority Fixes (in order)

1. **Remove 4 unused auth SDKs** from `package.json` (`firebase`, `aws-amplify`, `@supabase/supabase-js`, `@auth0/auth0-react`) and their provider files.
2. **Add `AuthGuard`** to the `/home` route immediately — it's currently wide open.
3. **Replace `alert()`** in `tokenExpired()` with a `sonner` toast + programmatic redirect.
4. **Fix `user_role` storage** — role must be derived from the JWT payload, not a separate `sessionStorage` key that any user can edit.
5. **Tie the splash screen** to `useAuthContext().loading` instead of a hard-coded 3-second timeout.
6. **Fix phone login** — don't pass `phoneNumber` as `email` in the request body.
7. **Delete all `_mock/` references** from `paths.js` and the route config.
8. **Decide: Tauri or Capacitor.** Remove the one you are not shipping.
9. **Update `package.json` name/author** from the template's identity to CampusSync.
10. **Delete the 30+ unused template components** once features are actually built, or risk the cognitive load growing with the team.
