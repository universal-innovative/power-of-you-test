import React from 'react';

//Material UI
import { AppBar, Slide, useScrollTrigger } from '@mui/material';

import { styled } from '@mui/material/styles';
// Components
import HeaderToolbar from './HeaderToolbar';

// ------------------------------------------------------------------------------------------------

function ScrollToHide(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <Slide appear={true} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const ToolbarMarginStyle = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,

  [theme.breakpoints.up('md')]: {
    marginTop: '1.5rem',
  },
  [theme.breakpoints.down('md')]: {
    marginTop: '1rem',
  },
  [theme.breakpoints.down('sm')]: {
    marginTop: '0.5rem',
  },
}));
const AppBarStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  background: 'linear-gradient(#F5F9FA,#ffffff)',
}));

// -------------------------------------------------------------------------------------------------------

function ScrollToHideHeader({ state, setState }) {
  return (
    <>
      <ScrollToHide>
        <AppBarStyle>
          <HeaderToolbar setState={setState} state={state} />
        </AppBarStyle>
      </ScrollToHide>
      <ToolbarMarginStyle />
    </>
  );
}

export default ScrollToHideHeader;
