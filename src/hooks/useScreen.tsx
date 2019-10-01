import { useContext, useMemo } from "react";
import { ScreenContext } from "../ScreenProvider";

interface ScreenContextReturn {
  screen: { name: string };
  showBackButton: boolean;
}

const useScreen = (): ScreenContextReturn => {
  const screen = useContext(ScreenContext) as ScreenContextReturn;
  return useMemo(() => screen, []); // eslint-disable-line
};

export default useScreen;
