import React from "react";
import Animated from "react-native-reanimated";

const Content = ({ style, ...props }) => (
  <Animated.View
    {...props}
    style={{
      bottom: 0,
      backgroundColor: "#fff",
      position: "absolute",
      width: "100%",
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      ...style
    }}
  />
);

export default Content;
