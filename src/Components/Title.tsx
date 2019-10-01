import React from "react";
import { View, Text } from "react-native";

interface TitleProps {
  children: React.ReactNode;
  color: string;
}

const Title = ({ children, color }: TitleProps) => (
  <View
    pointerEvents="none"
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <Text
      style={{
        color,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "500"
      }}
    >
      {children}
    </Text>
  </View>
);

export default Title;
