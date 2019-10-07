import React, { memo } from 'react';
import { Dimensions, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated from 'react-native-reanimated';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    ...(StyleSheet.absoluteFill as object),
    opacity: 0,
  },
});

type Props = {
  onPress: () => void;
  opacity?: Animated.Value<number> | number;
};

const Overlay = ({ onPress, opacity = 1 }: Props) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} style={screen}>
      <Animated.View style={[styles.overlay, { opacity }]} />
    </TouchableWithoutFeedback>
  );
};

export default memo(Overlay);
