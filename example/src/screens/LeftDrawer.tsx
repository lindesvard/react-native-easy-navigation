import React, { memo } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { useRouter, SAFE_AREA_TOP } from 'react-native-easy-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 200,
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#007aff',
    paddingTop: SAFE_AREA_TOP,
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
});

const LeftDrawer = () => {
  const { pop, navigateToExampleStack } = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>react-native</Text>
        <Text style={styles.text}>easy-navigation</Text>
      </View>
      <Button title="Close" onPress={pop} />
      <Button title="To stack" onPress={navigateToExampleStack} />
    </View>
  );
};

export default memo(LeftDrawer);
