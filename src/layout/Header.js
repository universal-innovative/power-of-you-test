import React from 'react';

//Material UI
import AppBar from '@mui/material/AppBar';
import { Collapse } from '@mui/material';

import { styled } from '@mui/material/styles';

import HeaderToolbar from './HeaderToolbar';

// ------------------------------------------------------------------------------------------------

// function SlideScroll(props) {
//   const { children } = props;

//   const trigger = useScrollTrigger({
//     disableHysteresis: true,
//     target: props.window ? window() : undefined,
//     threshold: 0,
//   });

//   return (
//     <Slide appear={true} direction="down" in={trigger}>
//       {children}
//     </Slide>
//   );
// }

const ToolbarMarginStyle = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,

  [theme.breakpoints.up('md')]: {
    marginTop: '0.3rem',
  },
  [theme.breakpoints.down('md')]: {
    marginTop: '0.4rem',
  },
  [theme.breakpoints.down('sm')]: {
    marginTop: '0.5rem',
  },
}));

const AppBarStyle = styled(AppBar)(({ theme }) => ({
  // zIndex: theme.zIndex.modal + 1,
  boxShadow: 'none !important',
  background: 'linear-gradient(#F5F9FA,#ffffff)',
}));

// -------------------------------------------------------------------------------------------------------

function Header({ state, setState }) {
  return (
    <>
      {/* <SlideScroll> */}
      <AppBarStyle position="fixed">
        <HeaderToolbar state={state} setState={setState} />
      </AppBarStyle>
      {/* </SlideScroll> */}
      <ToolbarMarginStyle />
    </>
  );
}

export default Header;
