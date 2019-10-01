import React, { memo } from "react";
import { Text, View, Button, TextInput } from "react-native";
import { useRouter, Screen } from "../src";

const ExampleHalfPanel = props => {
  console.log("re-render ExampleHalfPanel");
  const { navigateToModal, pop } = useRouter();

  return (
    <Screen title="Half panel">
      <Text>This is a half panel</Text>
      {[...Array(8)].map(() => (
        <View
          style={{
            height: 100,
            width: "100%",
            backgroundColor: "red",
            marginBottom: 10
          }}
        />
      ))}
      <Button onPress={navigateToModal} title="Go to modal" />
      <TextInput style={{ height: 50, width: 300, borderWidth: 1 }} />
      <Button title="Close" onPress={pop} />
    </Screen>
  );
};

export default memo(ExampleHalfPanel);
