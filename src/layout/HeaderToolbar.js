import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

//Material UI
import {
  Tabs,
  Toolbar,
  Box,
  Typography,
  Tab,
  useMediaQuery,
  IconButton,
  Stack,
  Menu,
  MenuItem,
  Badge,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  MenuOpen,
  ShoppingCart,
  AccountCircle,
  ArrowForwardIos,
} from '@mui/icons-material';
// ------------------------------------------------------------------------------------------------
import MuiHidden from '../components/materialComponents/MuiHidden';
import Drawer from './Drawer';
import SpringModal from '../components/materialComponents/modal/Modal';
import LoginForm from '../components/login/LoginForm';
import ForgetPassword from '../components/login/ForgetPassword';
import { useUser } from '../reactQuery/hooks/useUser';
import { AppContext } from '../layout/MainLayout';
//-----------------images---------------------//
import logo from '../assets/header/logo.png';
import { useAuth } from '../reactQuery/hooks/useAuth';
import { useGetCart } from '../reactQuery/hooks/useGetCart';
import databaseIcon from '../assets/header/database.svg';
import cartIcon from '../assets/header/cartIcon.svg';
import signOutIcon from '../assets/header/signOut.svg';
import accountCircle from '../assets/header/accountCircle.svg';

//----------------Styled Components----------------------//
const TabsStyle = styled(Tabs)({
  display: 'flex',
  // width: '20rem',
  justifyContent: 'center',
});

const TabStyle = styled(Tab)(({ theme }) => ({
  ...theme.typography.tab,
  width: 'max-content',
  minWidth: '10rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 120,
  color: theme.palette.common.grey,

  '& .MuiTabs-indicator': {
    marginTop: '10px',
    backgroundColor: theme.palette.common.white,
  },
  '&:hover': {
    color: theme.palette.common.grey,
    opacity: 1,
  },
  '&:focus': {
    color: theme.palette.common.grey,
    opacity: 1,
  },
}));

const MenuItemStyle = styled(MenuItem)(({ theme }) => ({
  ...theme.typography.tab,
  color: theme.palette.common.black,
  alignItems: 'center',
  opacity: 0.7,
  '&:hover': {
    opacity: 1,
  },
}));
const style = {
  position: 'absolute',
  top: '20rem',
  left: '50%',
  zIndex: 3333,
  transform: 'translate(-50%, -50%)',
  width: 420,

  bgcolor: 'background.paper',

  boxShadow: 24,
};

//--------------------DATA-------------------//
const dataArrayToolbar = [
  {
    label: 'Explore Database',
    path: 'databases',
    icon: databaseIcon,
  },
  { label: 'Profile', path: 'profile', icon: accountCircle },
  { label: 'Orders', path: 'orders', icon: cartIcon },
  { label: 'Signout', icon: signOutIcon },
];
// -------------------------------------------------------------------------------------------------------

function FixedHeader({ state, setState }) {
  const matchesPhone = useMediaQuery('(max-width: 600px)');
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [dataArray, setDataArray] = useState([]);
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const { signout } = useAuth();
  const { user } = useUser();
  const [authFormState, setAuthFormState] = useState('login');
  const { appState } = useContext(AppContext);
  const { dataCart, refetch } = useGetCart(appState?.cartId);

  useEffect(() => {
    refetch();
    setDataArray(dataCart?.data?.items);
  }, [dataCart?.data?.items, appState?.cartId]);

  const handleChange = (e, newValue) => {
    e.preventDefault();
    setValue(newValue);
  };
  const handleClick = (e) => {
    e.preventDefault();
    navigate('/');
    setState(false);
  };

  const mouseOver = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };
  const handleCloseDashboard = () => {
    setAnchorEl(null);
    setOpenMenu(false);
    navigate('/profile', { replace: true });
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };
  const handleCloseOrders = () => {
    setAnchorEl(null);
    setOpenMenu(false);
    navigate('/orders', { replace: true });
  };
  useEffect(() => {
    if (window.location.pathname === '/') {
      setValue(0);
    } else if (window.location.pathname === '/' && value !== 1) {
      setValue(1);
    } else if (window.location.pathname === '/database' && value !== 2) {
      setValue(2);
    } else if (window.location.pathname === '/cart' && value !== 3) {
      setValue(3);
    }
    // refetch();
  }, [window.location.pathname]);
  useEffect(() => {
    setAuthFormState('login');
  }, [openModal]);

  return (
    <>
      <Toolbar
        disableGutters
        sx={{
          backgroundColor: 'transparent',

          boxShadow: 'none',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingLeft: '15px',
            paddingRight: '15px',
          }}
        >
          <Box
            sx={{ display: 'flex', akignItems: 'center', cursor: 'pointer' }}
            onClick={handleClick}
          >
            <img
              alt=" logo"
              src={logo}
              style={{ height: '36px', width: '100px' }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifContent: 'space-evenly',
                marginRight: `${matchesPhone ? '8px' : '32px'}`,
              }}
            >
              <TabsStyle
                value={value}
                onChange={handleChange}
                textColor="secondary"
              >
                <MuiHidden width="mdDown">
                  <TabStyle
                    value={4}
                    onClick={() => {
                      navigate('/databases');
                    }}
                    label={
                      <Typography
                        variant="h8"
                        sx={{
                          color: value === 3 ? 'common.orange' : '#7A7A7A',
                          '&:hover': {
                            color: 'common.orange',
                            opacity: 1,
                          },
                        }}
                      >
                        Explore Databases
                      </Typography>
                    }
                  />
                </MuiHidden>
                {
                  // !user.token
                  !user?.token && (
                    <TabStyle
                      value={1}
                      label={
                        <Typography variant={matchesPhone ? 'subtitle1' : 'h6'}>
                          Sign in
                        </Typography>
                      }
                      icon={matchesPhone && <AccountCircle />}
                      onClick={() => setOpenModal(true)}
                      sx={{
                        width: `${matchesPhone ? '60px !important' : '10rem'}`,
                        backgroundColor: `${
                          matchesPhone ? 'transparent' : 'common.orange'
                        }`,
                        borderRadius: '5px',
                        height: '40px',
                        textTransform: `${!matchesPhone && 'uppercase'}`,
                        color: `${
                          !matchesPhone ? '#fff !important' : '#0A0A0A'
                        }`,
                        '&:hover': {
                          color: '#fff !important',
                          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
                        },

                        whiteSpace: 'nowrap',
                      }}
                    />
                  )
                }

                {user?.token && (
                  // user.token
                  <TabStyle
                    aria-haspopup={anchorEl ? 'true' : undefined}
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    onClick={mouseOver}
                    sx={{
                      color: `${matchesPhone && '#000000'}`,
                      minWidth: `${matchesPhone ? '60px !important' : '10rem'}`,
                    }}
                    label={
                      // `${user.firstName}`
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        {' '}
                        <Typography variant="h6">
                          {user?.name?.split(' ')[0]}
                        </Typography>
                        <MuiHidden width="smDown">
                          <ArrowForwardIos
                            sx={{
                              height: '16px',
                              width: '16px',
                              transform: `rotate(${
                                !openMenu ? '0deg' : '90deg'
                              })`,
                            }}
                          />
                        </MuiHidden>
                      </Stack>
                    }
                    icon={<AccountCircle />}
                    iconPosition={matchesPhone ? 'top' : 'start'}
                    // sx={{
                    //   marginLeft: '80vw',
                    // }}
                  />
                )}
              </TabsStyle>
              <MuiHidden width="mdDown">
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleClose}
                  MenuListProps={{ onMouseLeave: handleClose }}
                  elevation={0}
                  sx={{
                    zIndex: 1302,
                  }}
                  keepMounted
                >
                  <MenuItemStyle onClick={handleCloseDashboard}>
                    Profile
                  </MenuItemStyle>
                  <MenuItemStyle onClick={handleCloseOrders}>
                    Orders
                  </MenuItemStyle>
                  <MenuItemStyle
                    onClick={() => {
                      signout({ email: '' }, user.token);
                      navigate('/');
                    }}
                  >
                    <b> SIGN OUT</b>
                  </MenuItemStyle>
                  {user && user?.role?.includes('admin') && (
                    <MenuItemStyle
                      onClick={() => {
                        navigate('/admin');
                      }}
                    >
                      <b>Admin</b>
                    </MenuItemStyle>
                  )}
                </Menu>
              </MuiHidden>
            </Box>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ marginRight: '3%', marginTop: '-5px' }}>
                {' '}
                <IconButton
                  // variant="contained"
                  // color="secondary"
                  sx={{
                    color: `${!matchesPhone ? 'common.orange' : 'common.grey'}`,
                    '&:hover': { color: '#fff' },
                    // textTransform: 'capitalize',
                    whiteSpace: 'nowrap',
                  }}
                  onClick={() => {
                    navigate('/cart');
                  }}
                >
                  <Badge
                    badgeContent={dataArray && dataArray?.length}
                    sx={{
                      background: 'common.red',
                      color: 'primary.main',
                    }}
                  >
                    <ShoppingCart
                      sx={{
                        color: `${matchesPhone ? '#0A0A0A' : 'common.orange'}`,
                      }}
                    />
                  </Badge>
                </IconButton>
                <MuiHidden width="smUp">
                  <Box sx={{ marginTop: '-5px' }}>
                    <Typography variant="subtile1">Cart</Typography>
                  </Box>
                </MuiHidden>
              </Box>
            </Stack>
          </Box>
        </Box>
        <MuiHidden width="mdUp">
          <Stack
            alignItems="center"
            spacing={0.8}
            sx={{ marginRight: `${matchesPhone && '1.3rem'}` }}
          >
            <MenuOpen
              sx={{
                color: 'black',
                cursor: 'pointer',
              }}
              onClick={() => setState(!state)}
            />
            <Typography variant="subtile1">Menu</Typography>
          </Stack>
          <Drawer
            setState={setState}
            state={state}
            dataArray={dataArrayToolbar}
            signout={() => {
              signout({ email: '' }, user.token);
              navigate('/');
            }}
            token={user && user.token}
            sx={{
              position: 'absolute',
              backgroundColor: 'rgba(50, 50, 50, .3)',
            }}
          />
        </MuiHidden>
      </Toolbar>
      <SpringModal
        open={openModal}
        setOpen={setOpenModal}
        title={'Request Invite'}
        style={style}
      >
        {authFormState === 'login' ? (
          <LoginForm
            setOpenModal={setOpenModal}
            authFormState={authFormState}
            setAuthFormState={setAuthFormState}
          />
        ) : (
          <ForgetPassword setOpenModal={setOpenModal} />
        )}
      </SpringModal>
    </>
  );
}

export default FixedHeader;
