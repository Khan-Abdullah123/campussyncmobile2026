import { Helmet } from 'react-helmet-async';

import { RoleSelectionView } from 'src/sections/auth/role-selection-view';

// ----------------------------------------------------------------------

export default function RoleSelectionPage() {
  return (
    <>
      <Helmet>
        <title> Role Selection | CampusSync</title>
      </Helmet>

      <RoleSelectionView />
    </>
  );
}
