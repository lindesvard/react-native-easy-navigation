import React from "react";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { NavigationProvider, Tabs } from "./src";

import Home from "./screens/Home";
import Gallery from "./screens/Gallery";
import Profile from "./screens/Profile";
import ExampleModal from "./screens/ExampleModal";
import ExampleHalfPanel from "./screens/ExampleHalfPanel";
import ExampleStack from "./screens/ExampleStack";

const routes = {
  Home: {
    Component: Home,
    header: {
      backgroundColor: "#000",
      color: "white"
    }
  },
  Gallery: { Component: Gallery },
  Profile: { Component: Profile },
  ExampleModal: { Component: ExampleModal },
  ExampleHalfPanel: { Component: ExampleHalfPanel },
  ExampleStack: {
    Component: ExampleStack
  }
};

const router = {
  navigateToHome: {
    name: "Home",
    header: {
      backgroundColor: "red",
      color: "white"
    }
  },
  navigateToGallery: {
    name: "Gallery",
    header: {
      backgroundColor: "green",
      color: "white"
    }
  },
  navigateToProfile: {
    name: "Profile",
    header: {
      backgroundColor: "yellow",
      color: "#000"
    },
    statusBar: {
      barStyle: "dark-content"
    }
  },
  navigateToModal: {
    name: "ExampleModal",
    mode: "modal",
    header: null,
    statusBar: {
      barStyle: "dark-content"
    }
  }
};

const tabs = [
  {
    route: "Home",
    icon: "ios-car",
    label: "Home",
    badge: null
  },
  {
    route: "Gallery",
    icon: "ios-images",
    label: "Gallery",
    badge: 0
  },
  {
    route: "Profile",
    icon: "ios-contact",
    label: "Profile",
    badge: 3
  }
];

export default () => {
  return (
    <NavigationProvider
      initial={Object.keys(routes)[0]}
      routes={routes}
      router={router}
      renderTabs={route => {
        if (!["Home", "Gallery", "Profile"].includes(route.name)) {
          return null;
        }

        return (
          <Tabs>
            {tabs.map(({ route, label, icon, badge }) => (
              <Tabs.Item
                key={route}
                route={route}
                icon={active => (
                  <Ionicons
                    name={icon}
                    size={26}
                    color={active ? "#007aff" : "black"}
                  />
                )}
                label={active => (
                  <Text style={{ color: active ? "#007aff" : "black" }}>
                    {label}
                  </Text>
                )}
                badge={() => <Tabs.Badge number={badge} />}
              />
            ))}
          </Tabs>
        );
      }}
    />
  );
};
