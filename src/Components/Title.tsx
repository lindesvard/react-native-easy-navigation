import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  children: React.ReactNode;
  color: string;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
});

const Title = ({ children, color }: Props) => (
  <View pointerEvents="none" style={styles.container}>
    <Text style={[styles.title, { color }]}>{children}</Text>
  </View>
);

export default Title;
