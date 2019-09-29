import React from "react";
import { Button } from "react-native";

import { useNavigation, Screen } from "../src";

const ExampleStack = ({ customTitle }) => {
  const navigation = useNavigation();
  return (
    <Screen title={customTitle || "No title provided"}>
      <Button
        title="Push one more route"
        onPress={() =>
          navigation.push("ExampleStack", {
            header: {
              backgroundColor: "green",
              color: "white"
            },
            props: {
              customTitle: "With green header"
            }
          })
        }
      />
    </Screen>
  );
};

export default ExampleStack;
