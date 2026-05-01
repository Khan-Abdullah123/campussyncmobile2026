import { useMemo } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { alpha, createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const varAlpha = (color, opacity = 1) => alpha(color, opacity);

export const bgBlur = (props) => ({
  backdropFilter: `blur(${props?.blur || 6}px)`,
  WebkitBackdropFilter: `blur(${props?.blur || 6}px)`,
  backgroundColor: alpha(props?.color || '#000', props?.opacity || 0.8),
});

export const borderGradient = (props) => ({
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: props?.thickness || '2px',
    borderRadius: 'inherit',
    background: props?.color || 'linear-gradient(to right, red, blue)',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
  },
});

// ----------------------------------------------------------------------

export function ThemeProvider({ children }) {
  const memoizedValue = useMemo(
    () => ({
      palette: {
        primary: { main: '#00A76F' },
      },
    }),
    []
  );

  const theme = createTheme(memoizedValue);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
