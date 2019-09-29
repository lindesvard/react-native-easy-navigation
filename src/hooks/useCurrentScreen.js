import { useContext } from "react";
import { ScreenContext } from "../ScreenProvider";

console.log("ScreenContext", ScreenContext);

const useCurrentScreen = () => {
  return useContext(ScreenContext);
};

export default useCurrentScreen;
