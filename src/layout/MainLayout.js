import React, { useState, useEffect, createContext, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
//----------------MUI-----------------//
import {
  Avatar,
  Badge,
  Box,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useGroceries } from "../hooks/useGroceries";
// Components

import "./style.css";
import SearchBar from "./searchBar/SearchBar";
import { Favorite, ShoppingCart } from "@mui/icons-material";

export default function MainLayout() {
  const navigate = useNavigate();
  const matchesPhone = useMediaQuery("(max-width: 600px)");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const { serverState } = useGroceries(category);
  const [cart, setCart] = useState(
    window.localStorage.getItem("cart")
      ? JSON.parse(window.localStorage.getItem("cart"))
      : []
  );
  const [favorite, setFavorite] = useState(
    window.localStorage.getItem("favorite")
      ? JSON.parse(window.localStorage.getItem("favorite"))
      : []
  );
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "100vh",
          maxWidth: "100vw",
          position: "relative",
          zIndex: 1,
          padding: "5%",
        }}
      >
        {" "}
        <Grid container alignItems={"center"}>
          <Grid item lg={2} xl={1.2}>
            <Typography variant="h2">GROCERIES</Typography>
          </Grid>
          <Grid item lg={7} xl={7.8}>
            {" "}
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </Grid>
          <Grid item xs={3}>
            <Stack
              direction={"row"}
              alignItems="center"
              justifyContent={"space-evenly"}
            >
              {" "}
              <Badge
                badgeContent={favorite.length}
                sx={{
                  background: "common.red",
                  color: "primary.main",
                }}
              >
                <Favorite sx={{ color: "common.red" }} className="stackIcons" />
              </Badge>
              <Avatar
                className="stackIcons"
                alt="user"
                src={""}
                sx={{ width: "56px", height: "56px" }}
              ></Avatar>{" "}
              <IconButton
                // variant="contained"
                // color="secondary"
                sx={{
                  color: `${!matchesPhone ? "common.orange" : "common.grey"}`,
                  "&:hover": { color: "#fff" },
                  // textTransform: 'capitalize',
                  whiteSpace: "nowrap",
                }}
                onClick={() => {
                  // navigate("/cart");
                }}
              >
                <Badge
                  badgeContent={cart.length}
                  sx={{
                    background: "common.red",
                    color: "primary.main",
                  }}
                >
                  <ShoppingCart
                    className="stackIcons"
                    sx={{
                      color: "common.grey",
                    }}
                    onClick={() => navigate("/checkout")}
                  />
                </Badge>
              </IconButton>
            </Stack>
          </Grid>
          <Grid lg={12} xl={9}>
            {" "}
            <Outlet
              context={{
                serverState,
                setCategory,
                cart,
                setCart,
                favorite,
                setFavorite,
              }}
            />
          </Grid>
        </Grid>
      </Box>{" "}
    </>
  );
}
