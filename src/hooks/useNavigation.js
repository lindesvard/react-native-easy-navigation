import { useContext } from "react";
import { NavigationContext } from "../NavigationProvider";

const useNavigation = () => {
  return useContext(NavigationContext);
};

export default useNavigation;
