import 'src/global.css';

import { useEffect } from 'react';

import { Router } from 'src/routes/sections';
import { useRouter, usePathname } from 'src/routes/hooks';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { ThemeProvider } from 'src/theme';
import { LocalizationProvider } from 'src/locales';
import { I18nProvider } from 'src/locales/i18n-provider';

import { Snackbar } from 'src/components/snackbar';
import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { GlobalErrorBoundary } from 'src/components/error-boundary/error-boundary';

import { AuthProvider } from 'src/auth/context/jwt';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Handle Android Back Button via Tauri
    const handleBackButton = async () => {
      const { getCurrentWindow } = await import('@tauri-apps/api/window');
      const appWindow = getCurrentWindow();

      // Standard web back button handling that Tauri maps to physical button
      const onKeyDown = (e) => {
        if (e.key === 'BrowserBack' || e.key === 'Escape') {
          if (pathname === '/' || pathname === '/auth/role-selection' || pathname === '/home') {
            // On root pages, maybe show a toast "Press again to exit" or similar
            // For now, we'll let it be
          } else {
            router.back();
          }
        }
      };

      window.addEventListener('keydown', onKeyDown);

      return () => {
        window.removeEventListener('keydown', onKeyDown);
      };
    };

    handleBackButton();
  }, [pathname, router]);

  return (
    <GlobalErrorBoundary>
      <I18nProvider>
        <LocalizationProvider>
          <AuthProvider>
            <ThemeProvider>
              <MotionLazy>
                <Snackbar />
                <ProgressBar />
                <Router />
              </MotionLazy>
            </ThemeProvider>
          </AuthProvider>
        </LocalizationProvider>
      </I18nProvider>
    </GlobalErrorBoundary>
  );
}
