import styled from "@emotion/styled";
import { Favorite, ShoppingCart } from "@mui/icons-material";
import {
  Badge,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import cancel from "../../assets/icons/cancel.svg";
import plus from "../../assets/icons/plus.svg";
import minus from "../../assets/icons/minus.svg";

import "./style.css";
import { margin, maxHeight } from "@mui/system";

const Item = styled(Paper)(() => ({
  borderRadius: "10px",
  position: "relative",
  top: "-30px",
  height: "24px",
  width: "98px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  margin: "0 auto",
}));
const CheckoutCard = ({
  image,
  name,
  productId,
  available,
  availableColor,
  price,
  cartLength,
  addToCart,
  reduceItemFromCart,
  removeAllItemsByNameFromCart,
}) => {
  return (
    <Card
      sx={{
        display: "flex",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.55)",
        borderRadius: "30px",
        width: "100%",
        height: 113,
        position: "relative",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={1.2}>
          <img className="checkout-image" src={image} alt="checkout cover" />
        </Grid>
        <Grid item xs={5}>
          <Stack
            justifyContent={"space-around"}
            sx={{ height: "100%", padding: "8px 0" }}
          >
            <Typography component="div" variant="h5">
              {name}
            </Typography>

            <Typography variant="body1">{productId}</Typography>
          </Stack>{" "}
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Stack
            sx={{ margin: "auto 0", height: "100px" }}
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Stack direction={"row"} spacing={2} alignItems="center">
              <IconButton onClick={reduceItemFromCart}>
                <img src={minus} alt="minus" />{" "}
              </IconButton>
              <Typography variant="body1">{cartLength}</Typography>
              <IconButton onClick={addToCart}>
                {" "}
                <img src={plus} alt="plus" />
              </IconButton>
            </Stack>
            <Item sx={{ backgroundColor: availableColor }}>
              <Typography variant="subtitle1">{available}</Typography>
            </Item>{" "}
          </Stack>
        </Grid>

        <Grid xs={2.8} item>
          <Typography
            variant="h5"
            sx={{
              padding: "1rem",
            }}
          >
            {price}
          </Typography>
        </Grid>
      </Grid>
      <IconButton
        onClick={removeAllItemsByNameFromCart}
        sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
      >
        {" "}
        <img src={cancel} alt="cancel" />
      </IconButton>
    </Card>
  );
};
export default CheckoutCard;
