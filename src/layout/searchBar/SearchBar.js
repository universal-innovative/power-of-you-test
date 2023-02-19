import React, { useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Form, FormikProvider, useFormik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
//----------------------MUI----------------------//
import {
  Paper,
  IconButton,
  Stack,
  TextField,
  useMediaQuery,
  Grid,
  Typography,
  Avatar,
  Badge,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Clear, Favorite, ShoppingCart } from "@mui/icons-material";
import "./style.css";
import * as Yup from "yup";
//-------------------hooks---------------------//
import MuiHidden from "../../components/materialComponents/MuiHidden";

//----------------images----------------//
import filterIcon from "../../assets/searchBar/icon.png";

//-----------------Styled Components-----------------//
const Item = styled(Paper)(({ theme }) => ({
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
  [theme.breakpoints.down("sm")]: {
    boxShadow: "none",
  },
  borderRadius: "24px",
  padding: "4px 19px",
}));
const Schema = Yup.object().shape({
  search: Yup.string()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Search term required"),
});
const SearchBar = React.forwardRef(({ setSearchTerm, searchTerm }, ref) => {
  // const { categories } = useDatabases();

  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = React.useRef();
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    validationSchema: Schema,
  });
  const { errors, touched } = formik;

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    blur: () => {
      inputRef.current.blur();
    },
  }));
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate sx={{ color: "#000", width: "100%" }}>
        <Item>
          <Stack justifyContent={"space-between"}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <TextField
                inputRef={inputRef}
                onChange={handleChange}
                onFocus={() => navigate(location.pathname, { replace: true })}
                value={searchTerm}
                fullWidth
                error={Boolean(touched.search && errors.search)}
                helperText={touched.search && errors.search}
              />

              <IconButton>
                <img src={filterIcon} alt="Search-icon" />
              </IconButton>
            </Stack>
            <Stack direction={"row"}></Stack>
          </Stack>
        </Item>
      </Form>
    </FormikProvider>
  );
});

SearchBar.defaultProps = {
  closeIcon: <Clear />,

  placeholder: "Search for a database",
};

SearchBar.propTypes = {
  /** Whether to clear search on escape */
  cancelOnEscape: PropTypes.bool,
  /** Override the close icon. */
  closeIcon: PropTypes.node,
  /** Disables text field. */
  disabled: PropTypes.bool,
  /** Fired when the search is cancelled. */
  onCancelSearch: PropTypes.func,
  /** Fired when the text value changes. */
  onChange: PropTypes.func,
  /** Fired when the search icon is clicked. */
  onRequestSearch: PropTypes.func,
  /** Sets placeholder text for the embedded text field. */
  placeholder: PropTypes.string,
  /** Override the search icon. */
  searchIcon: PropTypes.node,
  /** Override the inline-styles of the root element. */
  style: PropTypes.object,
  /** The value of the text field. */
  value: PropTypes.string,
};

export default SearchBar;
