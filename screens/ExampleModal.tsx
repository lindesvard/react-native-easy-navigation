import React, { memo } from "react";
import { View, Button } from "react-native";

import { useRouter, Screen } from "../src";

const ExampleModal = props => {
  console.log("re-render ExampleModal");
  const { navigateToModal, pop, push } = useRouter();
  return (
    <Screen title="Modal">
      <Button title="One more modal?" onPress={navigateToModal} />
      <Button title="Close modal?" onPress={pop} />
      <Button
        title="Push route"
        onPress={() =>
          push("ExampleStack", {
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
    </Screen>
  );
};

export default memo(ExampleModal);
