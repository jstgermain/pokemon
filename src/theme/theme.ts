import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#E6B800",
      dark: "#B3A125",
      light: "#FFCB05",
      contrastText: "#000000",
    },
    secondary: {
      main: "#2A75BB",
      dark: "#1C5280",
      light: "#548FCC",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#CC0000",
    },
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
    },
    grey: {
      50: "#F8F9FA",
    },
    text: {
      primary: "#212121",
      secondary: "#6E6E6E",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      color: "#1C5280",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      color: "#1C5280",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
    },
    h4: {
      fontWeight: 500,
      fontSize: "1.5rem",
    },
    h5: {
      fontWeight: 500,
      fontSize: "1.25rem",
    },
    h6: {
      fontWeight: 500,
      fontSize: "1rem",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          padding: "10px 24px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 12px rgba(0, 0, 0, 0.15)",
          },
        },
      },
    },
  },
});
