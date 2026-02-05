import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";

const useTheme = () => {
  const state = useContext(ThemeContext);
  return state;
};

export default useTheme;
