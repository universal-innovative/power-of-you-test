import {
  Link as RouterLink,
  useNavigate,
  useOutletContext,
} from "react-router-dom";

import { Stack, Typography, Link, Box, Button, Grid } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";

import MuiHidden from "../materialComponents/MuiHidden";
import CheckoutCard from "./CheckoutCard";
import { v4 as uuidv4 } from "uuid";
import { string } from "yup";
//------------Styled Components-----------//

const GroceriesList = () => {
  //------Hooks------//
  const navigate = useNavigate();
  const { setCategory, serverState, cart, setCart, favorite, setFavorite } =
    useOutletContext();

  const addToCart = (id) => {
    window.localStorage.setItem("cart", JSON.stringify([...cart, id]));
    setCart([...cart, id]);
  };
  const reduceItemFromCart = (id) => {
    var index = cart.indexOf(id);

    if (index > -1) {
      window.localStorage.setItem(
        "cart",
        JSON.stringify([...cart.slice(0, index), ...cart.slice(index + 1)])
      );

      setCart([...cart.slice(0, index), ...cart.slice(index + 1)]);
    }
  };

  const removeAllItemByNameFromCart = (id) => {
    window.localStorage.setItem(
      "cart",
      JSON.stringify(cart.filter((item) => item !== id))
    );
    setCart(cart.filter((item) => item !== id));
  };
  const cartItems =
    serverState?.groceries?.filter((el) => cart.includes(el.name)) || [];
  return (
    <Stack>
      <Typography variant="h1">Checkout</Typography>
      <Stack spacing={5}>
        <>
          {!cartItems.length ? (
            <>
              <Typography variant="h2">Add item to the cart</Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/")}
              >
                Go to Groceries
              </Button>
            </>
          ) : (
            cartItems.map((item, i) => {
              return (
                <>
                  <CheckoutCard
                    cartLength={cart.filter((el) => el === item.name).length}
                    image={item?.img}
                    name={item?.name}
                    productId={`Product Id: ${"xOY6bQO8gu48CSxCa4pHvM9DWqEHgBjt5pWxRBpOo8ayGLFdKwrxmTspPNY2I3uGcmkBGnbmGf0vQJzeOt5UXQ58NHSKyEFu6qY9"
                      .split("")
                      .slice(item.name.length, 9 + item.name.length)
                      .join("")}`}
                    available={
                      item?.available < 10
                        ? `Only ${item?.available} left`
                        : "Available"
                    }
                    availableColor={
                      item?.available < 10 ? "common.orange" : "common.green"
                    }
                    price={item?.price}
                    addToCart={() => addToCart(item.name)}
                    removeAllItemByNameFromCart={() =>
                      removeAllItemByNameFromCart(item.name)
                    }
                    reduceItemFromCart={() => reduceItemFromCart(item.name)}
                  />
                </>
              );
            })
          )}
        </>
      </Stack>
    </Stack>
  );
};

export default GroceriesList;
