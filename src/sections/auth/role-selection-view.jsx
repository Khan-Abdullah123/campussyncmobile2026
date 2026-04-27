import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import CardActionArea from '@mui/material/CardActionArea';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { varAlpha } from 'src/theme/styles';
import { AvatarShape } from 'src/assets/illustrations';

import { Image } from 'src/components/image';

// ----------------------------------------------------------------------

export function RoleSelectionView() {
  const router = useRouter();

  const handleSelectRole = (role) => {
    router.push(paths.auth.signIn(role));
  };

  return (
    <Container sx={{ py: 10, textAlign: 'center' }}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Welcome to CampusSync
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        Please select your role to continue
      </Typography>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
        sx={{ maxWidth: 720, mx: 'auto' }}
      >
        <RoleCard
          name="Teacher"
          subTitle="Class Management"
          avatarUrl="/assets/illustrations/characters/character-1.webp"
          coverUrl="/assets/images/about/what-large.webp"
          onClick={() => handleSelectRole('teacher')}
        />

        <RoleCard
          name="Parent"
          subTitle="Child Progress"
          avatarUrl="/assets/illustrations/characters/character-2.webp"
          coverUrl="/assets/images/about/what-small.webp"
          onClick={() => handleSelectRole('parent')}
        />
      </Box>
    </Container>
  );
}

// ----------------------------------------------------------------------

function RoleCard({ name, subTitle, avatarUrl, coverUrl, onClick }) {
  return (
    <Card sx={{ textAlign: 'center' }}>
      <CardActionArea 
        onClick={onClick}
        sx={{
          [`&:hover .MuiCardActionArea-focusHighlight`]: {
            opacity: 0,
          },
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <AvatarShape
            sx={{
              left: 0,
              right: 0,
              zIndex: 10,
              mx: 'auto',
              bottom: -26,
              position: 'absolute',
              color: 'background.paper',
            }}
          />

          <Box
            sx={{
              width: 80,
              height: 80,
              zIndex: 11,
              left: 0,
              right: 0,
              bottom: -40,
              mx: 'auto',
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              component="img"
              src={avatarUrl}
              sx={{
                width: 1,
                height: 1,
                objectFit: 'contain',
              }}
            />
          </Box>

          <Image
            src={coverUrl}
            alt={coverUrl}
            ratio="16/9"
            slotProps={{
              overlay: {
                background: (theme) => varAlpha(theme.vars.palette.grey['900Channel'], 0.48),
              },
            }}
          />
        </Box>

        <ListItemText
          sx={{ mt: 7, mb: 3 }}
          primary={name}
          secondary={subTitle}
          primaryTypographyProps={{ typography: 'subtitle1' }}
          secondaryTypographyProps={{ component: 'span', mt: 0.5 }}
        />
      </CardActionArea>
    </Card>
  );
}
