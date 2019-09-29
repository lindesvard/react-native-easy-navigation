import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useNavigation from "./hooks/useNavigation";
import useCurrentScreen from "./hooks/useCurrentScreen";

const HEADER_HEIGHT = 70;
const SAFE_AREA_TOP = 32;

const Screen = ({ title, children }) => {
  const screen = useCurrentScreen();
  const { pop, depth } = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      {screen.header && (
        <View
          style={{
            ...StyleSheet.absoluteFill,
            height: HEADER_HEIGHT + SAFE_AREA_TOP,
            backgroundColor: screen.header.backgroundColor,
            bottom: undefined,
            zIndex: 10
          }}
        >
          <View
            style={{
              marginTop: SAFE_AREA_TOP,
              position: "absolute",
              left: 20,
              right: 20,
              height: HEADER_HEIGHT,
              justifyContent: "center"
            }}
          >
            {screen.mode === "push" && depth !== 1 && (
              <TouchableOpacity
                onPress={pop}
                style={{ zIndex: 2 }}
                hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
              >
                <Ionicons
                  name="ios-arrow-back"
                  size={26}
                  color={screen.header.color}
                />
              </TouchableOpacity>
            )}

            <View
              pointerEvents="none"
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: HEADER_HEIGHT,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  color: screen.header.color,
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: "500"
                }}
              >
                {title}
              </Text>
            </View>
          </View>
        </View>
      )}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {children}
      </View>
    </View>
  );
};

export default Screen;
