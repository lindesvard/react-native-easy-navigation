import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header';

interface ScreenProps {
  title: string;
  children: React.ReactNode;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

const Screen = ({ title, children }: ScreenProps) => {
  return (
    <View style={styles.container}>
      <Header title={title} />
      {children}
    </View>
  );
};

export default Screen;
