import {
  Link as RouterLink,
  useNavigate,
  useOutletContext,
} from "react-router-dom";

import { Stack, Typography, Link, Box, Button, Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import MuiHidden from "../materialComponents/MuiHidden";
import GroceryCard from "./GroceryCard";

//------------Styled Components-----------//
const categories = [`"All items"`, "Fruit", "Drinks", "Bakery"];
const GroceriesList = () => {
  //------Hooks------//
  const { setCategory, serverState, cart, setCart, favorite, setFavorite } =
    useOutletContext();
  const ref = useRef();

  const addToCart = (id) => {
    if (!cart.includes(id)) {
      window.localStorage.setItem("cart", JSON.stringify([...cart, id]));
      setCart([...cart, id]);
    } else {
      window.localStorage.setItem(
        "cart",
        JSON.stringify(cart.filter((item) => (item = id)))
      );
      setCart(cart.filter((item) => item !== id));
    }
  };

  const makeFavorite = (id) => {
    if (!favorite.includes(id)) {
      window.localStorage.setItem(
        "favorite",
        JSON.stringify([...favorite, id])
      );
      setFavorite([...favorite, id]);
    } else {
      window.localStorage.setItem(
        "favorite",
        JSON.stringify(favorite.filter((item) => item === id))
      );
      setFavorite(favorite.filter((item) => item !== id));
    }
  };
  return (
    <Stack>
      <Box
        ref={ref}
        sx={{ display: "flex", flexWrap: "no-wrap", overflowX: "auto" }}
      >
        {categories &&
          categories.map((item, i) => {
            return (
              <Button
                onClick={() => {
                  item !== "All items"
                    ? setCategory(item.toLowerCase())
                    : setCategory("all");
                }}
                style={{ cursor: "pointer", marginRight: "16px" }}
              >
                <Typography variant="body1">{item}</Typography>
              </Button>
            );
          })}
      </Box>
      <Typography variant="h1">Trending Items</Typography>
      <Grid container spacing={5}>
        <>
          {serverState?.groceries?.map((grocery) => {
            return (
              <Grid item lg={6} md={12}>
                <GroceryCard
                  makeFavorite={() => makeFavorite(grocery.name)}
                  favorite={favorite.includes(grocery.name)}
                  image={grocery?.img}
                  name={grocery?.name}
                  description={grocery?.description}
                  addedToCart={cart.includes(grocery.name)}
                  available={
                    grocery?.available < 10
                      ? `Only ${grocery?.available} left`
                      : "Available"
                  }
                  availableColor={
                    grocery?.available < 10 ? "common.orange" : "common.green"
                  }
                  price={grocery?.price}
                  addToCart={() => addToCart(grocery.name)}
                />
              </Grid>
            );
          })}
        </>
      </Grid>
    </Stack>
  );
};

export default GroceriesList;
