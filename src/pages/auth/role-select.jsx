import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { RoleSelectView } from 'src/sections/auth/role-select-view';

// ----------------------------------------------------------------------

const metadata = { title: `Choose role - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <RoleSelectView />
    </>
  );
}
