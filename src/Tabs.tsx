import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import useRouter from "./hooks/useRouter";
import useScreen from "./hooks/useScreen";

interface BadgeProps {
  number: number;
  color: string;
  backgroundColor: string;
}

interface TabsProps {
  children: React.ReactNode;
}

interface ItemProps {
  route: string;
  label: Function;
  icon: Function;
  badge: Function;
  onPress: Function;
}

const styles = StyleSheet.create({
  tabs: {
    ...(StyleSheet.absoluteFill as object),
    top: undefined,
    paddingBottom: 44,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 10
  },
  touchable: {
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 20
  },
  icon: {
    height: 40,
    width: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  label: {
    marginTop: 3,
    alignItems: "center"
  },
  badgeHolder: {
    zIndex: 2,
    position: "absolute",
    top: -5,
    right: -5
  },
  badge: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  badgeText: {
    fontSize: 10
  }
});

const Tabs = ({ children }: TabsProps) => {
  return <View style={styles.tabs}>{children}</View>;
};

const Item = ({ route, label, icon, badge, onPress }: ItemProps) => {
  const router = useRouter();
  const { screen } = useScreen();

  const active = route === (screen && screen.name);

  return (
    <TouchableOpacity
      onPress={() => (onPress ? onPress(router) : router.replace(route))}
      style={styles.touchable}
    >
      <View style={styles.icon}>
        {icon(active)}
        {badge && <View style={styles.badgeHolder}>{badge()}</View>}
      </View>
      <View style={styles.label}>{label(active)}</View>
    </TouchableOpacity>
  );
};

const Badge = ({
  number,
  color = "#fff",
  backgroundColor = "#007aff"
}: BadgeProps) => {
  if (!number) {
    return null;
  }

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={[styles.badgeText, { color }]}>{number}</Text>
    </View>
  );
};

Tabs.Item = Item;
Tabs.Badge = Badge;

export default Tabs;
