import React from 'react';

export const ScreenContext = React.createContext({});

type Props = {
  children: React.ReactNode;
  value: object;
};

const ScreenProvider = ({ children, value }: Props) => {
  return (
    <ScreenContext.Provider value={value}>{children}</ScreenContext.Provider>
  );
};

export default ScreenProvider;
