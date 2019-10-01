import React, { memo } from "react";
import { Text } from "react-native";

import { Screen } from "../src";

const Profile = props => {
  console.log("re-render Profile");
  return (
    <Screen title="Profile">
      <Text>Profile</Text>
    </Screen>
  );
};

export default memo(Profile);
