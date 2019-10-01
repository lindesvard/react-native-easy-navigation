import { useContext, useMemo } from "react";
import { NavigationContext } from "../NavigationProvider";

interface NavigationContextReturn {
  pop: Function;
  push: Function;
  replace: Function;
  reset: Function;
}

const useRouter = (): NavigationContextReturn => {
  const navigation = useContext(NavigationContext) as NavigationContextReturn;
  return useMemo(() => navigation, []); // eslint-disable-line
};

export default useRouter;
