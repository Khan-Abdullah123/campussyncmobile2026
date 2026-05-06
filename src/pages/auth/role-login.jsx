import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { RoleLoginView } from 'src/sections/auth/role-login-view';

// ----------------------------------------------------------------------

const metadata = { title: `Login - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <RoleLoginView />
    </>
  );
}
