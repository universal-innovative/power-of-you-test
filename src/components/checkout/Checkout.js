import {
  Link as RouterLink,
  useNavigate,
  useOutletContext,
} from "react-router-dom";

import {
  Stack,
  Typography,
  Link,
  Box,
  Button,
  Grid,
  Divider,
} from "@mui/material";
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
  const { serverState, cart, setCart, discount, setDiscount } =
    useOutletContext();
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
    if (
      !window.localStorage.getItem("discount")?.includes("Coca-Cola") &&
      cart.filter((el) => el === "Coca-Cola").length === 6
    ) {
      window.localStorage.setItem(
        "discount",
        JSON.stringify([...discount, "Coca-Cola"])
      );
      setDiscount([...discount, "Coca-Cola"]);
      snackbarDispatch(
        setSnackbar(
          true,
          "success",
          "Congratulations!! You got a free Coca-Cola"
        )
      );
    }
    if (
      window.localStorage.getItem("discount")?.includes("Coca-Cola") &&
      cart.filter((el) => el === "Coca-Cola").length === 5
    ) {
      window.localStorage.setItem(
        "discount",
        JSON.stringify(discount.filter((item) => item !== "Coca-Cola"))
      );
      setDiscount(discount.filter((item) => item !== "Coca-Cola"));
      snackbarDispatch(
        setSnackbar(true, "error", "Ewe!! You lost a free Coca-Cola")
      );
    }
    if (
      window.localStorage.getItem("discount")?.includes("Croissants") &&
      cart.filter((el) => el === "Croissants").length === 2
    ) {
      window.localStorage.setItem(
        "discount",
        JSON.stringify(discount.filter((item) => item !== "Croissants"))
      );
      setDiscount(discount.filter((item) => item !== "Croissants"));
      snackbarDispatch(
        setSnackbar(true, "error", "Ewe!! You lost a free Cofee")
      );
    }
    console.log(
      cart.filter((el) => el === "Croissants").length,
      "Croissants Length"
    );
    if (
      cart.filter((el) => el === "Croissants").length === 3 &&
      !window.localStorage.getItem("discount")?.includes("Croissants")
    ) {
      console.log("Wow");
      window.localStorage.setItem(
        "discount",
        JSON.stringify([...discount, "Croissants"])
      );

      setDiscount([...cart, "Coffee"]);
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
            <>
              {cartItems.map((item, i) => {
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
              })}
              <Stack>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="h5" align="right">
                      Subtotal
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h5" align="center"></Typography>
                  </Grid>
                  <Grid item xs={3}></Grid>
                </Grid>
                <Divider />
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="h5" align="right">
                      Discount
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h5" align="center"></Typography>
                  </Grid>
                  <Grid item xs={3}></Grid>
                </Grid>
                <Divider />
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="h5" align="right">
                      Total
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h5" align="center"></Typography>
                  </Grid>
                  <Grid item xs={3}></Grid>
                </Grid>
                <Divider />
              </Stack>
            </>
          )}
        </>
      </Stack>
    </Stack>
  );
};

export default Checkout;
