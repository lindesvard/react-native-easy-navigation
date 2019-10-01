import React from "react";
import { View } from "react-native";
import Header from "./Header";

interface ScreenProps {
  title: string;
  children: React.ReactNode;
}

const Screen = ({ title, children }: ScreenProps) => {
  return (
    <View style={{ flex: 1 }}>
      <Header title={title} />
      {children}
    </View>
  );
};

export default Screen;
