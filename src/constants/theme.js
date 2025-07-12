import { createTheme } from '@mui/material/styles'

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#023e8a'
    }
  },
  typography: {
    fontFamily: [
      'Inter',
      'sans-serif'
    ].join(','),
    h1: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em'
    },
    h2: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 600,
      letterSpacing: '-0.01em'
    },
    h3: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 600,
      letterSpacing: '-0.01em'
    },
    h4: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 600
    },
    h5: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 600
    },
    h6: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 600
    },
    subtitle1: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500
    },
    subtitle2: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500
    },
    body1: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 400,
      lineHeight: 1.6
    },
    body2: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 400,
      lineHeight: 1.5
    },
    button: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,
      textTransform: 'none',
      letterSpacing: '0.02em'
    },
    caption: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 400
    },
    overline: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,
      letterSpacing: '0.08em'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 16
        }
      }
    }
  }
})

export default muiTheme
