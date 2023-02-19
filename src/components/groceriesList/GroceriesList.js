import {
  Link as RouterLink,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { filter } from "lodash";
import { Stack, Typography, Link, Box, Button, Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import MuiHidden from "../materialComponents/MuiHidden";
import GroceryCard from "./GroceryCard";

//------------Styled Components-----------//
const categories = [`"All items"`, "Fruit", "Drinks", "Bakery"];

function applyFilter(array, query) {
  if (query) {
    return filter(
      array,
      (item) =>
        (item.title ? item?.title : item.firstName ? item.firstName : item.name)
          ?.toLowerCase()
          ?.indexOf(query?.toLowerCase()) !== -1
    );
  }
  return array;
}

const GroceriesList = () => {
  //------Hooks------//
  const {
    setCategory,
    serverState,
    cart,
    setCart,
    favorite,
    setFavorite,
    searchTerm,
  } = useOutletContext();
  const ref = useRef();

  const addToCart = (id) => {
    var index = cart.indexOf(id);
    if (!cart.includes(id)) {
      window.localStorage.setItem("cart", JSON.stringify([...cart, id]));
      setCart([...cart, id]);
    } else if (index > -1) {
      window.localStorage.setItem(
        "cart",
        JSON.stringify([...cart.slice(0, index), ...cart.slice(index + 1)])
      );

      setCart([...cart.slice(0, index), ...cart.slice(index + 1)]);
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
      {!applyFilter(serverState?.groceries, searchTerm)?.length ? (
        <>
          {" "}
          <Typography variant="h1">Not available for this search</Typography>
        </>
      ) : (
        <>
          {" "}
          <Typography variant="h1">Trending Items</Typography>
          <Grid container spacing={5}>
            <>
              {applyFilter(serverState?.groceries, searchTerm)?.map(
                (grocery) => {
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
                          grocery?.available < 10
                            ? "common.orange"
                            : "common.green"
                        }
                        price={grocery?.price}
                        addToCart={() => addToCart(grocery.name)}
                      />
                    </Grid>
                  );
                }
              )}
            </>
          </Grid>
        </>
      )}
    </Stack>
  );
};

export default GroceriesList;
