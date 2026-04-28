# CampusSync Mobile 2026 — Comprehensive Architectural Report

This report outlines the critical architectural issues identified in the initial critique and the corresponding fixes implemented to secure and optimize the application.

## 1. Summary Scorecard (Post-Fix)

| Area | Initial Grade | Current Grade | Notes |
| :--- | :---: | :---: | :--- |
| **Security** | D | **A-** | JWT roles secured, AuthGuard implemented, alerts removed. |
| **Bundle Size** | F | **B+** | Unused SDKs (Firebase, Amplify, etc.) removed. Dead code reduced. |
| **Identity** | F | **A** | Project renamed, template branding removed. |
| **Mobile Integration**| D | **B** | Capacitor removed; Tauri v2 optimized for Android. |
| **Auth Implementation**| C | **A** | Phone login fixed, session logic tied to auth readiness. |

---

## 2. Detailed Comparison: Issues vs. Fixes

| Priority Issue | Old State / Description | Updated Change / Fix |
| :--- | :--- | :--- |
| **1. Identity Crisis** | `package.json` was named `@minimal-kit/vite-js`. Identity was a desktop dashboard template. | Updated `package.json` name to `campussync-mobile`. Renamed project metadata to CampusSync. |
| **2. Dependency Bloat** | 88 dependencies. Unused SDKs for Firebase, AWS, Auth0, and Supabase were bundled. | **Removed 4 Auth SDKs** and Capacitor dependencies. Reduced bundle surface area significantly. |
| **3. Security Failures** | `user_role` was client-controlled via `sessionStorage`. Browser `alert()` blocked WebView execution. | **JWT-Derived Roles**: Role is now extracted from the token via `jwtDecode`. Replaced `alert()` with `sonner` toast. |
| **4. Auth Provider Junk** | `app.jsx` imported 5 different providers, bundling all even though only JWT was used. | **Simplified `app.jsx`**: Kept only `JwtAuthProvider`. Deleted the redundant code directories for other providers. |
| **5. Mock Data Leaks** | `paths.js` included demo routes and 23KB of hardcoded mock data for products/posts. | **Sanitized `paths.js`**: Removed all `_mock` imports and demo route scaffolding. |
| **6. Broken Nav Config** | Navigation menu was full of dead links (`href: '#'`) for Profile, Projects, and Settings. | **Cleanup Nav**: Removed all unimplemented items from `config-nav-account.jsx`. Only active routes remain. |
| **7. Route Guard Missing**| The `/home` route was public. Any user could bypass login by typing the URL. | **Implemented `AuthGuard`**: The `/home` route is now wrapped in a guard that redirects to sign-in if not authenticated. |
| **8. Broken Phone Login** | Phone number was incorrectly mapped to the `email` field in the login request body. | **Fixed API Logic**: `signInWithPassword` now correctly sends `email` and `phone` as distinct fields. |
| **9. Splash Screen Timer**| Users were forced to wait exactly 3 seconds regardless of how fast the app loaded. | **Intelligent Loading**: Splash screen visibility is now tied to `auth.loading`. It hides as soon as the session is verified. |
| **10. Tauri vs Capacitor** | Mutual exclusivity conflict. Both were installed, causing infrastructure confusion. | **Pivoted to Tauri**: Capacitor removed. Tauri v2 configured for direct Android APK builds. |

---

## 3. Fixed vs. Remaining Status

### ✅ FIXED
- [x] **Project Identity**: `package.json` and metadata updated.
- [x] **Auth Cleanup**: Removed Firebase, Amplify, Supabase, Auth0.
- [x] **Insecure Roles**: `user_role` no longer stored in `sessionStorage`.
- [x] **Route Guards**: `/home` is now protected.
- [x] **UI Polish**: Removed `alert()` and dead navigation links.
- [x] **Bug Fixes**: Fixed phone login mapping and splash screen timer.
- [x] **Mobile Pivot**: Capacitor removed in favor of Tauri Mobile.

### 🛠️ REMAINING / RECOMMENDED
- [ ] **Unused Components**: `src/components` still contains ~30 unused template components (Org charts, Data Grids, etc.). These should be deleted to further reduce bundle size.
- [ ] **Dead Form Links**: "Forgot password" and "Create account" in `login-view.jsx` are still dead links. They should be wired to actual pages.
- [ ] **Native Plugins**: Now that Tauri is the target, start implementing Tauri-specific native plugins for Camera, File System, or Push Notifications as needed.

---

## 4. How to Build the Updated App
The application is now a **Tauri v2 Mobile App**. 

To generate the Android APK:
1. Ensure the Android environment is set up (SDK/NDK).
2. Run: `npx tauri build --target android`
3. The APK will be generated in `src-tauri/gen/android/app/build/outputs/apk/release/`.
