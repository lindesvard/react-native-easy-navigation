import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { HEADER_HEIGHT, SAFE_AREA_TOP } from "../constants";
import useRouter from "../hooks/useRouter";
import useScreen from "../hooks/useScreen";
import { isHalfPanel, hasYTransition } from "../helpers";
import Title from "./Title";

interface HeaderHalfPanelProps {
  title: string;
  pop: Function;
}

interface HeaderProps {
  title: string;
}

const HeaderHalfPanel = ({ title, pop }: HeaderHalfPanelProps) => {
  return (
    <View
      style={{
        height: 26,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20
      }}
    >
      <Title color="black">{title}</Title>
      <TouchableOpacity
        onPress={pop}
        style={{ zIndex: 2, marginLeft: "auto" }}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <Ionicons name="ios-close" size={26} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const Header = ({ title }: HeaderProps) => {
  const { screen, showBackButton } = useScreen();
  const { pop } = useRouter();
  const { header, mode } = screen;

  if (!header) {
    return null;
  }

  const { color, backgroundColor } = header;

  if (isHalfPanel(mode)) {
    return <HeaderHalfPanel title={title} pop={pop} />;
  }

  return (
    <View
      style={{
        height: HEADER_HEIGHT + SAFE_AREA_TOP,
        backgroundColor
      }}
    >
      <View
        style={{
          marginTop: SAFE_AREA_TOP,
          height: HEADER_HEIGHT,
          justifyContent: "center",
          paddingHorizontal: 20
        }}
      >
        {showBackButton && (
          <TouchableOpacity
            onPress={pop}
            style={{ zIndex: 2 }}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Ionicons
              name={`ios-${hasYTransition(mode) ? "close" : "arrow-back"}`}
              size={26}
              color={color}
            />
          </TouchableOpacity>
        )}

        <Title color={color}>{title}</Title>
      </View>
    </View>
  );
};

export default Header;
