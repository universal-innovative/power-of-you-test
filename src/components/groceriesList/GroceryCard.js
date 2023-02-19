import styled from "@emotion/styled";
import { Favorite, ShoppingCart } from "@mui/icons-material";
import {
  Badge,
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import "./style.css";

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
}));
const GroceryCard = ({
  image,
  name,
  description,
  available,
  availableColor,
  price,
  addToCart,
  addedToCart,
  favorite,
  makeFavorite,
}) => {
  return (
    <Card
      sx={{
        display: "flex",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.55)",
        borderRadius: "30px",
        width: 518,
        height: 317,
      }}
    >
      <img className="grocery-image" src={image} alt="grocery cover" />
      <Stack justifyContent={"space-between"} sx={{ height: "100%" }}>
        <CardContent>
          <Typography component="div" variant="h5">
            {name}
          </Typography>

          <p className="description">{description}</p>
        </CardContent>
        <CardContent
          sx={{ display: "flex", flexDirection: "column", height: 110 }}
        >
          <Item sx={{ backgroundColor: availableColor }}>
            <Typography variant="subtitle1">{available}</Typography>
          </Item>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              pl: 1,
              pb: 1,
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5">{price}</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {" "}
              <IconButton onClick={addToCart}>
                <ShoppingCart
                  className="stackIcons"
                  sx={{
                    color: addedToCart ? "common.red" : "common.grey",
                  }}
                />
              </IconButton>{" "}
              <IconButton onClick={makeFavorite}>
                <Favorite
                  sx={{ color: favorite ? "common.red" : "common.grey" }}
                  className="stackIcons"
                />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Stack>
    </Card>
  );
};
export default GroceryCard;
