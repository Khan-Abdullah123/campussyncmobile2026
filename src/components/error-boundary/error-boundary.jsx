import { ErrorBoundary } from 'react-error-boundary';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Something went wrong
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 4 }}>
          {error.message}
        </Typography>
        <Button variant="contained" color="primary" onClick={resetErrorBoundary}>
          Reload App
        </Button>
      </Box>
    </Container>
  );
}

export function GlobalErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        window.location.reload();
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
