import React, { memo } from "react";
import { View, Button, Text } from "react-native";

import { useRouter } from "../src";
import { SAFE_AREA_TOP } from "../src/constants";

const LeftDrawer = props => {
  const { pop, navigateToExampleStack } = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          height: 200,
          width: "100%",
          alignContent: "center",
          justifyContent: "center",
          backgroundColor: "#007aff",
          paddingTop: SAFE_AREA_TOP
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#fff",
            fontSize: 20,
            fontWeight: "500"
          }}
        >
          react-native
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: "#fff",
            fontSize: 20,
            fontWeight: "500"
          }}
        >
          easy-navigation
        </Text>
      </View>
      <Button title="Close" onPress={pop} />
      <Button title="To stack" onPress={navigateToExampleStack} />
    </View>
  );
};

export default memo(LeftDrawer);
