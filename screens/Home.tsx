import React from "react";
import { Button } from "react-native";

import { useNavigation, Screen } from "../src";

const Home = props => {
  const navigation = useNavigation();
  return (
    <Screen title="Home">
      <Button
        title="Push route"
        onPress={() =>
          navigation.push("ExampleStack", {
            props: {
              customTitle: "Hello world"
            }
          })
        }
      />
      <Button
        title="Push route (no animation)"
        onPress={() =>
          navigation.push("ExampleStack", {
            props: {
              customTitle: "Hello world"
            },
            animated: false
          })
        }
      />
      <Button title="Open modal" onPress={navigation.navigateToModal} />
      <Button
        title="Open half panel"
        onPress={() =>
          navigation.push("ExampleHalfPanel", { mode: "half-panel" })
        }
      />
    </Screen>
  );
};

export default Home;
