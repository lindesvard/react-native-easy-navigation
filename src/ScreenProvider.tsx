import React from "react";

export const ScreenContext = React.createContext({});

const ScreenProvider = ({ children, value }) => {
  return (
    <ScreenContext.Provider value={value}>{children}</ScreenContext.Provider>
  );
};

export default ScreenProvider;
