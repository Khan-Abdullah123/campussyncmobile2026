import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const ALERT_ICONS = {
  absent: { icon: 'solar:user-cross-bold', color: 'error' },
  deadline: { icon: 'solar:clock-circle-bold', color: 'warning' },
  exam: { icon: 'solar:notebook-bold', color: 'info' },
  fee: { icon: 'solar:wallet-bold', color: 'success' },
};

export function AppAlerts({ title, subheader, list, ...other }) {
  const theme = useTheme();

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 1 }} />

      <Box sx={{ p: 2, gap: 1.5, display: 'flex', flexDirection: 'column' }}>
        {list.map((alert) => {
          const alertType = ALERT_ICONS[alert.type] || { icon: 'solar:bell-bold', color: 'default' };
          const paletteColor = alertType.color === 'default'
            ? theme.palette.grey[500]
            : theme.palette[alertType.color].main;

          return (
            <Box
              key={alert.id}
              sx={{
                p: 1.5,
                gap: 1.5,
                borderRadius: 1.5,
                display: 'flex',
                alignItems: 'center',
                bgcolor: alpha(paletteColor, 0.08),
                border: `1px solid ${alpha(paletteColor, 0.16)}`,
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  display: 'flex',
                  flexShrink: 0,
                  borderRadius: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: paletteColor,
                  bgcolor: alpha(paletteColor, 0.16),
                }}
              >
                <Iconify icon={alertType.icon} width={20} />
              </Box>

              <Box flexGrow={1}>
                <Typography variant="body2" fontWeight="medium">
                  {alert.message}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {alert.time}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Card>
  );
}
