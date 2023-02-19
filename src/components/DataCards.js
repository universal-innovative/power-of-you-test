import React, { useState } from 'react';
import './style.css';
//-------------MUI---------------//
import {
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  Box,
  Card,
} from '@mui/material';
import { styled } from '@mui/material/styles';

//------------------components-------------//
import ProductDetails from './databaseShop/ProductDetails';
import SpringModal from './materialComponents/modal/Modal';
import MuiHidden from './materialComponents/MuiHidden';

//------------------images------------------//
import database from '../assets/home/trendingDatabases/database.svg';
import rupeeIcon from '../assets/home/trendingDatabases/rupeeIcon.svg';
import { Close, ShoppingCart } from '@mui/icons-material';
import jobSeekers from '../assets/home/trendingDatabases/jobSeekers.png';
import { useNavigate } from 'react-router-dom';
//----------------Styled components-----------------//
const Item = styled(Paper)(({ theme }) => ({
  borderRadius: '100%',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.55)',
  height: '56px',
  width: '56px',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.common.orange,
  transition: 'transform 0.3s ease-in',
  '&:hover': {
    transform: 'scale(1.02) translateY(-0.2rem)',
  },
}));

const style = {
  zIndex: 3333,

  display: 'flex',

  bgcolor: 'background.paper',
  boxShadow: 24,
};

//----------------RAFCE----------------//
const ImageCards = ({
  image,
  title,
  description,
  recordsCount,
  priceSale,
  price,
  productId,
}) => {
  const matchesPhone = useMediaQuery('(max-width: 600px)');
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  return (
    <>
      <Card
        sx={{
          width: '288px',
          minHeight: '352px',
          marginTop: '1.5rem',
        }}
        onClick={() =>
          navigate(
            `/product-details/${title.replace(/[&||' '||/]/g, '-')}`,

            {
              state: {
                productId,
                title,
              },
            }
          )
        }
      >
        <Box sx={{ cursor: 'pointer' }}>
          <Stack spacing={1}>
            <Box
              sx={{
                width: '288px',
                backgroundImage: jobSeekers,
                position: 'relative',
                height: '160px',
              }}
            >
              <img
                loading="lazy"
                src={image ? image : jobSeekers}
                alt={title}
                style={{
                  position: 'absolute',
                  top: '0px',
                  bottom: '0px',
                  width: '100%',
                  height: '100%',
                  maxHeight: '155px',
                  objectFit: 'cover',
                }}
              />
            </Box>
            <Stack spacing={1} sx={{ padding: '1% 3%' }}>
              <Typography
                variant="h6"
                sx={{
                  maxWidth: '256px',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                }}
              >
                {title.length < 25
                  ? title
                  : title
                      .substring(0, 25)
                      .substring(0, title.substring(0, 25).lastIndexOf(' ')) +
                    '...'}
              </Typography>

              <Box
                className="danger-html"
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              ></Box>

              <Stack
                direction="row"
                alignItems="center"
                spacing={0.25}
                sx={{
                  width: 'max-content',
                  height: '24px',
                  borderRadius: '12px',
                  backgroundColor: 'common.grey',
                  color: 'primary.main',
                  padding: '0 1rem',
                  whiteSpace: 'nowrap',
                }}
              >
                <img src={database} alt={'data'} />
                <Typography variant="subtitle1">
                  {recordsCount} records
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ padding: '0 3%', marginBottom: '2rem' }}
            >
              <Stack direction="row" alignItems="center" spacing={0.25}>
                <img
                  src={rupeeIcon}
                  alt={'rupee'}
                  style={{ height: '40px', width: '40px' }}
                />
                <Stack spacing={-0.25}>
                  <Typography
                    variant="subtitle3"
                    sx={{
                      color: 'common.grey',
                      textDecoration: 'line-through',
                      lineHeight: '14px',
                    }}
                  >
                    {priceSale && `${priceSale}`}
                  </Typography>
                  <Typography variant="h2" sx={{ lineHeight: '36px' }}>
                    {price && price}
                  </Typography>
                </Stack>
              </Stack>
              <Item>
                <ShoppingCart />
              </Item>
            </Stack>
          </Stack>
        </Box>
      </Card>
      {/* <SpringModal
        open={open}
        setOpen={setOpen}
        style={{
          ...style,
          width: `${matchesPhone ? '100%' : '808px'}`,
          position: !matchesPhone && 'absolute',
          left: !matchesPhone && '50%',
          top: !matchesPhone && '50%',
          height: `${!matchesPhone && '90%'}`,
          transform: !matchesPhone && 'translate(-50%, -50%)',
        }}

        // sx={{ zIndex: '120000000 !important' }}
      >
        <MuiHidden width="smUp">
          <Close
            onClick={() => setOpen(false)}
            sx={{
              backgroundColor: 'common.red',
              borderRadius: '100%',
              color: 'common.white',
              position: 'fixed',
              right: '0.4rem',
              top: '0.4rem',
              zIndex: '999999',
              cursor: 'pointer',
            }}
          />
        </MuiHidden>
        <ProductDetails productId={productId} />
      </SpringModal> */}
    </>
  );
};

export default ImageCards;
