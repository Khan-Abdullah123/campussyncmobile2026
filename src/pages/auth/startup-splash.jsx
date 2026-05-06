import { useEffect } from 'react';

import { useRouter } from 'src/routes/hooks';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      router.replace('/role-selection');
    }, 1500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [router]);

  return <SplashScreen portal={false} />;
}
