import React, { memo } from 'react';
import { Text, View, Button, TextInput, StyleSheet } from 'react-native';
import { useRouter, Screen } from 'react-native-easy-navigation';

const styles = StyleSheet.create({
  box: {
    height: 100,
    width: '100%',
    backgroundColor: 'red',
    marginBottom: 10,
  },
  input: { height: 50, width: 300, borderWidth: 1 },
});

const ExampleHalfPanel = () => {
  const { navigateToModal, pop } = useRouter();

  return (
    <Screen title="Half panel">
      <Text>This is a half panel</Text>
      {[...Array(8)].map((_, index) => (
        <View key={index} style={styles.box} />
      ))}
      <TextInput style={styles.input} />
      <Button onPress={navigateToModal} title="Go to modal" />
      <Button title="Close" onPress={pop} />
    </Screen>
  );
};

export default memo(ExampleHalfPanel);
