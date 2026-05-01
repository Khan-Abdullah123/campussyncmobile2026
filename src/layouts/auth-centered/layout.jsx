import Box from '@mui/material/Box';

import { useBoolean } from 'src/hooks/use-boolean';

import { Main } from './main';
import { HeaderBase } from '../core/header-base';
import { LayoutSection } from '../core/layout-section';

// ----------------------------------------------------------------------

export function AuthCenteredLayout({ children }) {
  const nav = useBoolean();

  return (
    <LayoutSection
      headerSection={
        <HeaderBase
          disableNav
          onOpenNav={nav.onTrue}
          slots={{
            leftNode: <Box sx={{ typography: 'h6' }}>CampusSync</Box>,
          }}
        />
      }
      footerSection={null}
      cssVars={{ '--layout-auth-content-width': '480px' }}
    >
      <Main>{children}</Main>
    </LayoutSection>
  );
}
