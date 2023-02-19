import React, { useEffect } from "react";
//-------------------MUI-------------------//
import { Box, Stack } from "@mui/material";

//-------------------Imported Components---------------------//

import Page from "../components/Page";
import MuiHidden from "../components/materialComponents/MuiHidden";
import GroceriesList from "../components/groceriesList/GroceriesList";
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
        <GroceriesList />
      </Stack>
    </Page>
  );
};

export default Groceries;
