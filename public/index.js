import { createTheme, alpha } from '@mui/material/styles';

// ─── Exact same color tokens as desktop (colors.json) ──────────────────────

const COLORS = {
  primary: {
    lighter: '#C8FAD6',
    light:   '#5BE49B',
    main:    '#00A76F',
    dark:    '#007867',
    darker:  '#004B50',
    contrastText: '#FFFFFF',
  },
  secondary: {
    lighter: '#EFD6FF',
    light:   '#C684FF',
    main:    '#8E33FF',
    dark:    '#5119B7',
    darker:  '#27097A',
    contrastText: '#FFFFFF',
  },
  info: {
    lighter: '#CAFDF5',
    light:   '#61F3F3',
    main:    '#00B8D9',
    dark:    '#006C9C',
    darker:  '#003768',
    contrastText: '#FFFFFF',
  },
  success: {
    lighter: '#D3FCD2',
    light:   '#77ED8B',
    main:    '#22C55E',
    dark:    '#118D57',
    darker:  '#065E49',
    contrastText: '#ffffff',
  },
  warning: {
    lighter: '#FFF5CC',
    light:   '#FFD666',
    main:    '#FFAB00',
    dark:    '#B76E00',
    darker:  '#7A4100',
    contrastText: '#1C252E',
  },
  error: {
    lighter: '#FFE9D5',
    light:   '#FFAC82',
    main:    '#FF5630',
    dark:    '#B71D18',
    darker:  '#7A0916',
    contrastText: '#FFFFFF',
  },
  grey: {
    50:  '#FCFDFD',
    100: '#F9FAFB',
    200: '#F4F6F8',
    300: '#DFE3E8',
    400: '#C4CDD5',
    500: '#919EAB',
    600: '#637381',
    700: '#454F5B',
    800: '#1C252E',
    900: '#141A21',
  },
};

// ─── Theme factory ──────────────────────────────────────────────────────────

export function buildTheme(mode = 'light') {
  const isLight = mode === 'light';

  return createTheme({
    palette: {
      mode,
      primary:   COLORS.primary,
      secondary: COLORS.secondary,
      info:      COLORS.info,
      success:   COLORS.success,
      warning:   COLORS.warning,
      error:     COLORS.error,
      grey:      COLORS.grey,
      divider:   alpha(COLORS.grey[500], 0.2),
      text: isLight
        ? { primary: COLORS.grey[800], secondary: COLORS.grey[600], disabled: COLORS.grey[500] }
        : { primary: '#FFFFFF',        secondary: COLORS.grey[500],  disabled: COLORS.grey[600] },
      background: isLight
        ? { paper: '#FFFFFF',          default: '#FFFFFF',           neutral: COLORS.grey[200] }
        : { paper: COLORS.grey[800],   default: COLORS.grey[900],    neutral: '#28323D' },
      action: {
        hover:             alpha(COLORS.grey[500], 0.08),
        selected:          alpha(COLORS.grey[500], 0.16),
        focus:             alpha(COLORS.grey[500], 0.24),
        disabled:          alpha(COLORS.grey[500], 0.80),
        disabledBackground:alpha(COLORS.grey[500], 0.24),
        active: isLight ? COLORS.grey[600] : COLORS.grey[500],
        hoverOpacity:      0.08,
        disabledOpacity:   0.48,
      },
    },

    shape: { borderRadius: 8 },  // same as desktop

    typography: {
      fontFamily: "'Public Sans', sans-serif",
      fontWeightLight:    300,
      fontWeightRegular:  400,
      fontWeightMedium:   500,
      fontWeightSemiBold: 600,
      fontWeightBold:     700,
      h1: { fontFamily: "'Barlow', sans-serif", fontWeight: 800, fontSize: '2rem' },
      h2: { fontFamily: "'Barlow', sans-serif", fontWeight: 800, fontSize: '1.75rem' },
      h3: { fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: '1.5rem' },
      h4: { fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: '1.25rem' },
      h5: { fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: '1.125rem' },
      h6: { fontWeight: 600, fontSize: '1rem' },
      subtitle1: { fontWeight: 600, fontSize: '0.9375rem', lineHeight: 1.5 },
      subtitle2: { fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.57 },
      body1: { fontSize: '0.9375rem', lineHeight: 1.5 },
      body2: { fontSize: '0.875rem', lineHeight: 1.57 },
      caption: { fontSize: '0.75rem', lineHeight: 1.5 },
      button: { fontWeight: 700, fontSize: '0.875rem', textTransform: 'unset' },
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: { body: { scrollbarWidth: 'thin' } },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            boxShadow: isLight
              ? '0 1px 2px 0 rgba(145,158,171,0.08), 0 2px 10px -3px rgba(145,158,171,0.12)'
              : '0 1px 2px 0 rgba(0,0,0,0.24), 0 2px 10px -3px rgba(0,0,0,0.20)',
          }),
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 700,
            textTransform: 'unset',
            minHeight: 44,   // touch-friendly
          },
          contained: { boxShadow: 'none', '&:hover': { boxShadow: 'none' } },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: { minWidth: 44, minHeight: 44 },  // touch-friendly
        },
      },
      MuiTextField: {
        defaultProps: { variant: 'outlined', size: 'medium' },
        styleOverrides: {
          root: { borderRadius: 8 },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: { borderRadius: 8 },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 600 },
        },
      },
      MuiBottomNavigation: {
        styleOverrides: {
          root: ({ theme }) => ({
            height: 64,
            borderTop: `1px solid ${theme.palette.divider}`,
          }),
        },
      },
      MuiBottomNavigationAction: {
        styleOverrides: {
          root: {
            minWidth: 'unset',
            padding: '6px 0',
            '&.Mui-selected': { color: COLORS.primary.main },
          },
          label: { fontSize: '0.6875rem', fontWeight: 600 },
        },
      },
      MuiAppBar: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: ({ theme }) => ({
            borderBottom: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }),
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: { minHeight: 48 },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: { borderRadius: 8, minHeight: 48 },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: { fontWeight: 700 },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: { borderRadius: 8 },
        },
      },
      MuiSkeleton: {
        defaultProps: { animation: 'wave' },
      },
    },
  });
}

// Default exports
export const lightTheme = buildTheme('light');
export const darkTheme  = buildTheme('dark');
