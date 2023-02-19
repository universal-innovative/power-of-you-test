import { useEffect, useState } from "react";

export const useGroceries = (category) => {
  const [state, setState] = useState({
    loading: false,
    success: false,
    error: "",
    groceries: [],
  });

  const getGroceries = async () => {
    try {
      setState({
        ...state,
        loading: true,
      });
      const res = await fetch(
        `https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=${
          category ? category : "all"
        }`
      );
      const data = await res.json();

      if (res.status === 200) {
        setState({
          ...state,
          loading: false,
          groceries: data,
        });
      }
    } catch (err) {}
  };

  useEffect(() => {
    getGroceries();
  }, []);

  return { serverState: state };
};
