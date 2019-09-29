import React from "react";
import { View, Button } from "react-native";

import { useNavigation } from "../src";

const ExampleModal = props => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="One more modal?" onPress={navigation.navigateToModal} />
      <Button title="Close modal?" onPress={navigation.pop} />
      <Button
        title="Push route"
        onPress={() =>
          navigation.push("ExampleStack", {
            header: {
              backgroundColor: "blue",
              color: "white"
            },
            props: {
              customTitle: "With blue header"
            }
          })
        }
      />
    </View>
  );
};

export default ExampleModal;
