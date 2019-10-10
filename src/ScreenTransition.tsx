import React, { useMemo } from 'react';
import { StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { timing } from 'react-native-redash';
import {
  isDrawer,
  hasYTransition,
  hasXTransition,
  getModeBackground,
} from './helpers';
import { TRANSITION_DURATION } from './constants';
import { ModeType } from './types';

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
  and,
} = Animated;

type Props = {
  children: React.ReactNode;
  mounted: boolean;
  onUnmount: () => void;
  pop: () => void;
  mode: ModeType;
  animated: boolean;
};

const { width, height } = Dimensions.get('window');

const getXOutputRange = (mode: ModeType) => {
  switch (mode) {
    case 'drawer':
      return [-width, 0];
    default:
      return [width, 0];
  }
};

const getContainerWidth = (mode: ModeType) => {
  switch (mode) {
    case 'drawer':
      return width - 100;
    default:
      return width;
  }
};

const styles = StyleSheet.create({
  overlay: {
    ...(StyleSheet.absoluteFill as object),
    backgroundColor: '#000',
  },
});

const Transition = ({
  children,
  mounted,
  onUnmount,
  mode,
  animated,
  pop,
}: Props) => {
  const animateY = animated && hasYTransition(mode);
  const animateX = animated && hasXTransition(mode);
  const drawer = isDrawer(mode);

  const { animation, clock } = useMemo(
    () => ({
      animation: new Value(0),
      clock: new Clock(),
    }),
    []
  );

  const translateX = animateX
    ? interpolate(animation, {
        inputRange: [0, 1],
        outputRange: getXOutputRange(mode),
      })
    : 0;

  const translateY = animateY
    ? interpolate(animation, {
        inputRange: [0, 1],
        outputRange: [height, 0],
      })
    : 0;

  const opacity = animated
    ? interpolate(animation, {
        inputRange: [0, 1],
        outputRange: [0, 0.7],
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
          easing: Easing.inOut(Easing.ease),
        })
      ),
      cond(and(not(clockRunning(clock)), not(mounted)), call([], onUnmount)),
    ]),
    [mounted]
  );

  return (
    <Animated.View style={StyleSheet.absoluteFill}>
      <TouchableWithoutFeedback onPress={drawer ? pop : () => {}}>
        <Animated.View style={[styles.overlay, { opacity }]} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            width: getContainerWidth(mode),
            backgroundColor: getModeBackground(mode),
            transform: [{ translateX }, { translateY }],
          },
        ]}
      >
        {children}
      </Animated.View>
    </Animated.View>
  );
};

export default Transition;
