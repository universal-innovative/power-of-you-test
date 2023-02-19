import React, { useState, useEffect, createContext, useContext } from "react";
// routes
import Router from "./routes";

// Material
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

import { SnackbarContextProvider } from "./components/snackbar/MySnackbar";
import { MySnackbar } from "./components/snackbar/MySnackbar";
// -------------------------------------------------------------------------------------------

const App = () => {
  return (
    <>
      <SnackbarContextProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <Router />

            <MySnackbar />
          </ThemeProvider>
        </StyledEngineProvider>{" "}
      </SnackbarContextProvider>
    </>
  );
};

export default App;
