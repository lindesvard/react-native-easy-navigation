import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import useNavigation from "./hooks/useNavigation";

const styles = StyleSheet.create({
  tabs: {
    ...StyleSheet.absoluteFill,
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

const Tabs = ({ children }) => {
  return <View style={styles.tabs}>{children}</View>;
};

const Item = ({ route, label, icon, badge }) => {
  const { current, replace } = useNavigation();
  const active = route === (current && current.name);

  return (
    <TouchableOpacity onPress={() => replace(route)} style={styles.touchable}>
      <View style={styles.icon}>
        {icon(active)}
        {badge && <View style={styles.badgeHolder}>{badge()}</View>}
      </View>
      <View style={styles.label}>{label(active)}</View>
    </TouchableOpacity>
  );
};

const Badge = ({ number, color = "#fff", backgroundColor = "#007aff" }) => {
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
