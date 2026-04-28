import { useTheme } from '@mui/material/styles';

import { Logo } from 'src/components/logo';

import { HeaderSection } from './header-section';

// ----------------------------------------------------------------------

export function HeaderBase({
  sx,
  slots,
  slotProps,
  layoutQuery = 'md',
  ...other
}) {
  const theme = useTheme();

  return (
    <HeaderSection
      sx={sx}
      layoutQuery={layoutQuery}
      slots={{
        ...slots,
        leftArea: (
          <>
            {slots?.leftAreaStart}
            <Logo data-slot="logo" />
            {slots?.leftAreaEnd}
          </>
        ),
        rightArea: (
          <>
            {slots?.rightAreaStart}
            {slots?.rightAreaEnd}
          </>
        ),
      }}
      slotProps={slotProps}
      {...other}
    />
  );
}
