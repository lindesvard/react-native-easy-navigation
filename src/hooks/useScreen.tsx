import { useContext, useMemo } from 'react';
import { ScreenContext } from '../ScreenProvider';
import { RouteType } from '../types';

type ScreenContextReturn = {
  screen: RouteType;
  showBackButton: boolean;
};

const useScreen = (): ScreenContextReturn => {
  const screen = useContext(ScreenContext) as ScreenContextReturn;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => screen, []);
};

export default useScreen;
