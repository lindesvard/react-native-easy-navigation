import React, { useMemo } from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { timing } from "react-native-redash";
import BottomSheet from "./Components/BottomSheet";
import {
  Mode,
  hasYTransition,
  hasXTransition,
  getModeBackground
} from "./helpers";
import { TRANSITION_DURATION } from "./constants";

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

interface TransitionProps {
  children: React.ReactNode;
  mounted: boolean;
  onUnmount: Function;
  pop: Function;
  mode: Mode;
  animated: boolean;
}

const Transition = ({
  children,
  mounted,
  onUnmount,
  mode,
  animated,
  pop
}: TransitionProps) => {
  const animateY = animated && hasYTransition(mode);
  const animateX = animated && hasXTransition(mode);

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
          duration: animated ? TRANSITION_DURATION : 0,
          easing: Easing.inOut(Easing.ease)
        })
      ),
      cond(and(not(clockRunning(clock)), not(mounted)), call([], onUnmount))
    ]),
    [mounted]
  );

  const isHalfPanel = mode === "half-panel";

  return (
    <Animated.View style={{ ...StyleSheet.absoluteFill }}>
      <Animated.View
        style={{ ...StyleSheet.absoluteFill, backgroundColor: "#000", opacity }}
      />
      <Animated.View
        style={{
          ...StyleSheet.absoluteFill,
          backgroundColor: getModeBackground(mode),
          transform: [{ translateX }, { translateY }]
        }}
      >
        {isHalfPanel ? (
          <BottomSheet
            distanceFromTop={150}
            onClose={pop}
            scenes={[{ key: "only", children }]}
          />
        ) : (
          children
        )}
      </Animated.View>
    </Animated.View>
  );
};

export default Transition;
