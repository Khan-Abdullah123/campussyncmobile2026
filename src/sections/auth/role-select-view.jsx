import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { alpha, useTheme } from '@mui/material/styles';
import CardActionArea from '@mui/material/CardActionArea';

import { useRouter } from 'src/routes/hooks';

import { Image } from 'src/components/image';

// ----------------------------------------------------------------------

const ROLE_CARDS = [
  {
    role: 'teacher',
    title: 'Teacher',
    illustration: 'https://illustrations.popsy.co/amber/teaching.svg',
    description:
      'Manage classes, attendance, and student performance with role-specific teacher controls.',
    points: [
      'Manage multiple classrooms',
      'Track student attendance',
      'Grade and performance reports',
    ],
  },
  {
    role: 'parent',
    title: 'Parent',
    illustration: 'https://illustrations.popsy.co/amber/family-time.svg',
    description:
      'Track child updates, attendance, and communication from school in one focused experience.',
    points: [
      'Real-time child tracking',
      'School communications',
      'Event and fee updates',
    ],
  },
];

export function RoleSelectView() {
  const theme = useTheme();
  const router = useRouter();

  const handleSelectRole = (role) => {
    router.push(`/login/${role}`);
  };

  return (
    <Container disableGutters maxWidth="lg">
      <Stack spacing={1} sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3">Choose Your Role</Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Select your experience to continue to your dashboard.
        </Typography>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gap: 4,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
          },
        }}
      >
        {ROLE_CARDS.map((item) => (
          <Box key={item.role}>
            <Card
              sx={{
                height: 1,
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
                boxShadow: theme.customShadows.card,
                transition: theme.transitions.create(['box-shadow', 'transform'], {
                  duration: theme.transitions.duration.shorter,
                }),
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.customShadows.z24,
                },
              }}
            >
              <CardActionArea onClick={() => handleSelectRole(item.role)} sx={{ p: 2 }}>
                <Box
                  sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.04),
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 240,
                  }}
                >
                  <Image
                    alt={item.title}
                    src={item.illustration}
                    sx={{
                      maxHeight: 200,
                      objectFit: 'contain',
                    }}
                  />
                </Box>

                <CardContent sx={{ p: 0 }}>
                  <Typography variant="h5" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    {item.description}
                  </Typography>

                  <Stack spacing={1}>
                    {item.points.map((point) => (
                      <Stack key={point} direction="row" spacing={1} alignItems="center">
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                          }}
                        />
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {point}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </CardContent>
              </CardActionArea>

              <Divider sx={{ borderStyle: 'dashed' }} />

              <CardActions sx={{ p: 2.5 }}>
                <Button
                  fullWidth
                  color="inherit"
                  size="large"
                  variant="contained"
                  onClick={() => handleSelectRole(item.role)}
                  sx={{
                    bgcolor: 'text.primary',
                    color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                    '&:hover': {
                      bgcolor: 'text.secondary',
                    },
                  }}
                >
                  Login as {item.title}
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
}


