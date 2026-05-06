import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export function AppTopInstalledCountries({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar sx={{ minHeight: 254 }}>
        <Box
          sx={{
            p: 3,
            gap: 3,
            minWidth: 360,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {list.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </Box>
      </Scrollbar>
    </Card>
  );
}

// ----------------------------------------------------------------------

function Item({ item, sx, ...other }) {
  const smallItem = (icon, system, color) => (
    <Box
      sx={{
        gap: 0.5,
        minWidth: 80,
        display: 'flex',
        typography: 'body2',
        alignItems: 'center',
      }}
    >
      <Iconify icon={icon} width={14} sx={{ color: color || 'text.secondary' }} />
      {system}%
    </Box>
  );

  return (
    <Box sx={{ gap: 2, display: 'flex', alignItems: 'center', ...sx }} {...other}>
      <Box
        sx={{
          gap: 1,
          minWidth: 160,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Iconify icon="solar:calendar-date-bold" width={24} sx={{ color: 'primary.main' }} />
        <Typography component="span" variant="subtitle2" noWrap>
          {item.countryName}
        </Typography>
      </Box>
      {smallItem('solar:user-bold', item.android, 'success.main')}
      {smallItem('solar:user-bold', item.windows, 'info.main')}
      {smallItem('solar:user-bold', item.apple, 'warning.main')}
    </Box>
  );
}
