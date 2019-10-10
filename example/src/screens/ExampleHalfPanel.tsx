import React, { memo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BottomSheet } from 'react-native-easy-navigation';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  box: {
    height: 50,
    width: '100%',
    backgroundColor: '#f2f2f2',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Wizard = ({ number }: { number: number }) => (
  <View style={styles.container}>
    {[...Array(number)].map((_, index) => (
      <View style={styles.box} key={String(index)}>
        <Text>Hello {index}</Text>
      </View>
    ))}
  </View>
);

const getTitle = ({ index }: { index: number }): string | undefined => {
  switch (index) {
    case 0:
      return 'Första';
    case 1:
      return 'Andra';
    case 2:
      return 'Tredje';
    default:
      return;
  }
};

const scenes = [() => <Wizard number={1} />, () => <Wizard number={5} />];

const ExampleHalfPanel = () => {
  return <BottomSheet title={getTitle} scenes={scenes} />;
};

export default memo(ExampleHalfPanel);
