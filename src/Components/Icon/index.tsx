import React from 'react';
import { Image, StyleSheet } from 'react-native';

const icons = {
  bars: require('./bars.png'),
  'chevron-left': require('./chevron-left.png'),
  close: require('./close.png'),
};

type Props = {
  name: 'bars' | 'chevron-left' | 'close';
  color: string;
  size: number;
};

const styles = StyleSheet.create({
  icon: { width: 30, height: 30 },
});

const Icon = ({ name, color }: Props) => {
  return (
    <Image source={icons[name]} style={[styles.icon, { tintColor: color }]} />
  );
};

export default Icon;
