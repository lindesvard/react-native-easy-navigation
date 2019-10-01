import React, { memo } from "react";
import { Dimensions, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Animated from "react-native-reanimated";

const screen = Dimensions.get("window");

const Overlay = ({ onPress, opacity }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} style={screen}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFill,
          opacity: 0
        }}
      />
    </TouchableWithoutFeedback>
  );
};

export default memo(Overlay);
