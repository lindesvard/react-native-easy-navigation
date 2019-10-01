import React, { memo } from "react";
import { Button } from "react-native";

import { useRouter, Screen } from "../src";

const ExampleStack = ({ customTitle }) => {
  console.log("re-render ExampleStack");
  const { push } = useRouter();
  return (
    <Screen title={customTitle || "No title provided"}>
      <Button
        title="Push one more route"
        onPress={() =>
          push("ExampleStack", {
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

export default memo(ExampleStack);
