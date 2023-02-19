import { useReducer, useEffect, useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import SnackbarContext from './SnackbarContext';

const initialState = {
  snackbarOpen: false,
  snackbarSeverity: 'success',
  snackbarMessage: '',
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'setSnackbar':
      const { snackbarOpen, snackbarMessage, snackbarSeverity } = action;
      return {
        ...state,
        snackbarOpen,
        snackbarSeverity,
        snackbarMessage,
      };
    default:
      return state;
  }
};

export const setSnackbar = (
  snackbarOpen,
  snackbarSeverity = 'success',
  snackbarMessage = ''
) => ({
  type: 'setSnackbar',
  snackbarOpen,
  snackbarSeverity,
  snackbarMessage,
});

export const SnackbarContextProvider = ({ children }) => {
  const [snackbarState, snackbarDispatch] = useReducer(reducer, initialState);
  return (
    <SnackbarContext.Provider value={{ snackbarState, snackbarDispatch }}>
      {children}
    </SnackbarContext.Provider>
  );
};
export const MySnackbar = () => {
  const { snackbarState, snackbarDispatch } = useContext(SnackbarContext);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    snackbarDispatch(
      setSnackbar(
        false,
        snackbarState.snackbarSeverity,
        snackbarState.snackbarMessage
      )
    );
  };
  return (
    <Snackbar
      open={snackbarState.snackbarOpen}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity={snackbarState.snackbarSeverity}
      >
        {snackbarState.snackbarMessage}
      </Alert>
    </Snackbar>
  );
};
