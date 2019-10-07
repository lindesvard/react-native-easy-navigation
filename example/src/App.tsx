import React from 'react';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
  NavigationProvider,
  Tabs,
  RouterType,
  RouteType,
} from 'react-native-easy-navigation';

import LeftDrawer from './screens/LeftDrawer';
import Home from './screens/Home';
import Gallery from './screens/Gallery';
import Profile from './screens/Profile';
import ExampleModal from './screens/ExampleModal';
import ExampleHalfPanel from './screens/ExampleHalfPanel';
import ExampleStack from './screens/ExampleStack';

const routes = {
  Home: {
    Component: Home,
    header: {
      backgroundColor: '#000',
      color: 'white',
    },
  },
  Gallery: { Component: Gallery },
  Profile: { Component: Profile },
  ExampleModal: { Component: ExampleModal },
  ExampleHalfPanel: { Component: ExampleHalfPanel },
  ExampleStack: {
    Component: ExampleStack,
  },
  LeftDrawer: {
    Component: LeftDrawer,
  },
};

const router = {
  navigateToProfile: {
    name: 'Profile',
    header: {
      backgroundColor: 'yellow',
      color: '#000',
    },
  },
};

const tabs = [
  {
    route: 'Home',
    label: 'Home',
    icon: 'ios-car',
    badge: null,
  },
  {
    route: 'Gallery',
    label: 'Gallery',
    icon: 'ios-images',
    badge: 0,
  },
  {
    route: 'Profile',
    label: 'Profile',
    icon: 'ios-contact',
    badge: 3,
  },
  {
    route: 'More',
    label: 'More',
    icon: 'ios-more',
    onPress: (router: RouterType) =>
      router.push('LeftDrawer', { mode: 'drawer' }),
  },
];

const getColor = (active: boolean) => (active ? '#007aff' : 'black');

export default () => {
  return (
    <NavigationProvider
      initial={Object.keys(routes)[0]}
      routes={routes}
      router={router}
      renderTabs={(route: RouteType) => {
        if (!['Home', 'Gallery', 'Profile'].includes(route.name)) {
          return null;
        }

        return (
          <Tabs>
            {tabs.map(({ route, label, icon, badge, onPress }) => (
              <Tabs.Item
                key={route}
                route={route}
                onPress={onPress}
                icon={(active: boolean) => (
                  <Ionicons name={icon} size={26} color={getColor(active)} />
                )}
                label={(active: boolean) => (
                  <Text style={{ color: getColor(active) }}>{label}</Text>
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
