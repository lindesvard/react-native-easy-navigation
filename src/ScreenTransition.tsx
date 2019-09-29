import React, { useMemo } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { timing } from "react-native-redash";

const {
  useCode,
  block,
  set,
  Value,
  Clock,
  interpolate,
  cond,
  clockRunning,
  not,
  call,
  and
} = Animated;

export enum Mode {
  Modal = "modal",
  HalfPanel = "half-panel",
  Replace = "replace",
  Initial = "initial",
  Push = "push"
}

interface TransitionProps {
  children: React.ReactNode;
  mounted: boolean;
  onUnmount: Function;
  mode: Mode;
  animated: boolean;
}

const Transition = ({
  children,
  mounted,
  onUnmount,
  mode,
  animated
}: TransitionProps) => {
  const animateY = animated && (mode === "modal" || mode === "half-panel");
  const animateX = animated && !animateY;

  const { width, height } = Dimensions.get("window");
  const { animation, clock } = useMemo(
    () => ({
      animation: new Value(0),
      clock: new Clock()
    }),
    []
  );

  const translateX = animateX
    ? interpolate(animation, {
        inputRange: [0, 1],
        outputRange: [width, 0]
      })
    : 0;

  const translateY = animateY
    ? interpolate(animation, {
        inputRange: [0, 1],
        outputRange: [height, 0]
      })
    : 0;

  const opacity = animated
    ? interpolate(animation, {
        inputRange: [0, 1],
        outputRange: [0, 0.7]
      })
    : 0.7;

  useCode(
    block([
      set(
        animation,
        timing({
          clock,
          from: animation,
          to: mounted ? 1 : 0,
          duration: animated ? 200 : 0,
          easing: Easing.inOut(Easing.ease)
        })
      ),
      cond(and(not(clockRunning(clock)), not(mounted)), call([], onUnmount))
    ]),
    [mounted]
  );

  const getBackground = mode => {
    switch (mode) {
      case "half-panel":
        return "transparent";
      default:
        return "#fff";
    }
  };

  const isHalfPanel = mode === "half-panel";

  return (
    <Animated.View style={{ ...StyleSheet.absoluteFill }}>
      <Animated.View
        style={{ ...StyleSheet.absoluteFill, backgroundColor: "#000", opacity }}
      />
      <Animated.View
        style={{
          ...StyleSheet.absoluteFill,
          backgroundColor: getBackground(mode),
          transform: [{ translateX }, { translateY }]
        }}
      >
        {isHalfPanel ? (
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end"
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20
              }}
            >
              {children}
            </View>
          </View>
        ) : (
          children
        )}
      </Animated.View>
    </Animated.View>
  );
};

export default Transition;
