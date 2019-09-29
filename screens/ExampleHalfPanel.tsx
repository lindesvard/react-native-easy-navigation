import React from "react";
import { Text, View, Button } from "react-native";

import { useNavigation } from "../src";

const ExampleHalfPanel = props => {
  const { pop } = useNavigation();

  return (
    <View style={{ height: 350, width: "100%" }}>
      <Text>This is a half panel</Text>
      <Button title="Close" onPress={pop} />
    </View>
  );
};

export default ExampleHalfPanel;
