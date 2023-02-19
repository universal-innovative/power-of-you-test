import {
  Link as RouterLink,
  useNavigate,
  useOutletContext,
} from "react-router-dom";

import { Stack, Typography, Link, Box, Button, Grid } from "@mui/material";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import CheckoutCard from "./CheckoutCard";
import SnackbarContext from "../snackbar/SnackbarContext";

import { setSnackbar } from "../snackbar/MySnackbar";
//------------Styled Components-----------//

const Checkout = () => {
  //------Hooks------//
  const navigate = useNavigate();
  const { serverState, cart, setCart } = useOutletContext();
  const { snackbarDispatch } = useContext(SnackbarContext);
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

  useEffect(() => {
    if (cart.filter((el) => el === "Coca-Cola").length === 6) {
      window.localStorage.setItem(
        "cart",
        JSON.stringify([...cart, "Coca-Cola"])
      );
      setCart([...cart, "Coca-Cola"]);
      snackbarDispatch(
        setSnackbar(
          true,
          "success",
          "Congratulations!! You got a free Coca-Cola"
        )
      );
    }
    console.log(
      cart.filter((el) => el === "Croissants").length,
      "Croissants Length"
    );
    if (
      cart.filter((el) => el === "Croissants").length === 3 &&
      window.localStorage.getItem("free") !== "Coffee"
    ) {
      console.log("Wow");
      window.localStorage.setItem("cart", JSON.stringify([...cart, "Coffee"]));
      window.localStorage.setItem("free", "Coffee");
      setCart([...cart, "Coffee"]);
      snackbarDispatch(
        setSnackbar(true, "success", "Congratulations!! You got a free Coffee")
      );
    }
  }, [cartItems]);

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

export default Checkout;
