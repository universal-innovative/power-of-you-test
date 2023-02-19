import React, { useEffect } from "react";
//-------------------MUI-------------------//
import { Box, Stack } from "@mui/material";

//-------------------Imported Components---------------------//

import Page from "../components/Page";
import MuiHidden from "../components/materialComponents/MuiHidden";
import Checkout from "../components/checkout/Checkout";
//--------------------RAFCE------------------//
const Groceries = () => {
  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
    window.scrollTo(0, 0);
  }, []);
  return (
    <Page title="Groceries">
      <Stack spacing={7}>
        <Checkout />
      </Stack>
    </Page>
  );
};

export default Groceries;
