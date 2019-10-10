import React from 'react';
import { Image, StyleSheet } from 'react-native';

const icons = {
  bars: require('./bars.png'),
  'chevron-left': require('./chevron-left.png'),
  'chevron-right': require('./chevron-right.png'),
  close: require('./close.png'),
};

type Props = {
  name: 'bars' | 'chevron-left' | 'chevron-right' | 'close';
  color?: string;
  size?: number;
};

const getSize = (size: number): { width: number; height: number } => ({
  width: size,
  height: size,
});

const styles = StyleSheet.create({
  icon: {
    ...getSize(30),
  },
});

const Icon = ({ name, color, size }: Props) => {
  return (
    <Image
      source={icons[name]}
      style={[
        styles.icon,
        color ? { tintColor: color } : {},
        size ? getSize(size) : {},
      ]}
    />
  );
};

export default Icon;
