import axios from "../axios/axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import store from "../redux/store";
import { toast } from "react-toastify";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const login = async (userName, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/login", { userName, password });
      const json = response.data;
      // save user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      console.log(localStorage.getItem("user"));
      // update the store
      dispatch({ type: "USER_LOGIN", payload: json });
      console.log(store.getState());
    } catch (err) {
      toast.error(err.response.data.error)
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
};