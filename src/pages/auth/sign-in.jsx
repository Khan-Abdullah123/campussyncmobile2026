import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { LoginView } from 'src/sections/auth/login-view';

// ----------------------------------------------------------------------

export default function SignInPage() {
  const { role } = useParams();

  return (
    <>
      <Helmet>
        <title> Sign In | CampusSync</title>
      </Helmet>

      <LoginView role={role || 'teacher'} />
    </>
  );
}
