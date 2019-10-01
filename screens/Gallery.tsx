import React, { memo } from "react";
import { Text } from "react-native";

import { Screen } from "../src";

const Gallery = props => {
  console.log("re-render Gallery");
  return (
    <Screen title="Gallery">
      <Text>My gallery</Text>
    </Screen>
  );
};

export default memo(Gallery);
