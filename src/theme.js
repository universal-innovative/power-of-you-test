import { createTheme } from "@mui/material/styles";

const white = "#FFFFFF";
const grey = "#8C8C8C";
const bgGrey = "#F3F9FA";
const yellow = "#FDB750";
const black = "0A0A0A";
const green = "#00a711";
const red = "#E86F6F";

const orange = "#ff9345";

const theme = createTheme({
  palette: {
    background: {
      default: white,
    },

    primary: {
      main: white,
      dark: "#eaf4fc",
      light: "#FFFFFF",
    },
    secondary: {
      main: red,
    },
    common: {
      black,
      grey,
      yellow,
      green,
      red,
      orange,
      bgGrey,
    },
  },
  typography: {
    tab: {
      fontFamily: "Almarai",
      textTransform: "none",
      fontWeight: 700,
      fontSize: "1rem",
      color: black,
    },

    h1: {
      fontFamily: "Almarai",
      fontSize: "36px",
      lineHeight: "56px",
      fontWeight: 700,
      color: black,
    },

    h2: {
      fontFamily: "Almarai",
      fontSize: "2rem",
      lineHeight: "56px",
      fontWeight: 700,
      color: black,
    },
    h3: {
      fontFamily: "Almarai",
      fontSize: "1.5rem",
      fontWeight: 700,
      color: black,
    },
    h4: {
      fontFamily: "Almarai",
      fontSize: "1.5rem",
      fontWeight: 400,
      color: black,
    },
    h5: {
      fontSize: "1.25rem",
      fontFamily: "Almarai",
      fontStyle: "normal",
      fontWeight: 700,
      color: black,
    },

    h6: {
      fontSize: "18px",
      fontFamily: "Almarai",
      fontStyle: "normal",
      fontWeight: 700,
      color: black,
    },

    h7: {
      fontSize: "1rem",
      fontFamily: "Almarai",
      fontStyle: "normal",
      fontWeight: 700,
      color: black,
    },
    body1: {
      fontSize: "1rem",
      fontFamily: "Almarai",
      fontStyle: "normal",
      fontWeight: 400,
      color: black,
    },

    subtitle1: {
      fontWeight: 400,
      fontFamily: "Almarai",
      lineHeight: "19px",
      fontSize: "14px",
      color: black,
      fontStyle: "normal",
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    },
  },
});
export default theme;
