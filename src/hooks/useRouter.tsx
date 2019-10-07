import { useContext, useMemo } from 'react';
import { NavigationContext } from '../NavigationProvider';
import { RouterType } from '../types';

const useRouter = (): RouterType => {
  const navigation = useContext(NavigationContext) as RouterType;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => navigation, []);
};

export default useRouter;
