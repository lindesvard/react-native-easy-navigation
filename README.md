# react-native-easy-navigation

Simple and fast navigation for react-native

**Still under development**

> Note: Needs `react-native-reanimated` and `react-native-gesture-handler`!

## Table of Contents

- [Why?](#why)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#Components)
  - [NavigationProvider](#NavigationProvider)
  - [Screen](#Screen)
- [Hooks](#Hooks)
  - [useScreen](#useScreen)
  - [useRouter](#useRouter)

## Why this instead of react-navigation or wix-navigation?

Well, in most cases I guess the best option this to choose one of above but I created this lib so I could create apps faster with less worry about the navigation part.
This lib is super flexible. The only required component to use is `NavigationProvider`. The rest is just there for getting started faster.

## Features

- Supports left-to-right transitions for ios and android
- Same transitions on both ios and android
- Drawer support
- Tabs support
- Supports push, replace and pop screens
- Regular screens
- Half panels
- Modals
- Layovers

## Installation

Follow the instructions how to install `react-native-gesture-handler` and `react-native-reanimated`. Nothing else is required. Read [Usage](#usage) to get started using the navigation.

## Usage

```jsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {
  Screen,
  NavigationProvider,
  Tabs,
  useRouter,
} from 'react-native-easy-navigation';

const Home = () => {
  const router = useRouter();
  return (
    <Screen title="Home">
      <Button
        onPress={() => router.navigateToArticle({ title: 'Article 1', id: 1 })}
        title="Go to Article 1"
      />
      <Button
        onPress={() => router.navigateToArticle({ title: 'Article 2', id: 2 })}
        title="Go to Article 2"
      />
    </Screen>
  );
};

const Profile = () => {
  const router = useRouter();
  return (
    <Screen title="Profile">
      <Button
        onPress={() =>
          router.navigateToMyModal({
            text: 'Modal: This is a prop passed to the Modal screen',
          })
        }
        title="Open modal"
      />
      <Button
        onPress={() =>
          router.navigateToMyHalfPanel({
            text: 'HalfPanel: This is a prop passed to the Modal screen',
          })
        }
        title="Open half panel"
      />
    </Screen>
  );
};

const Article = ({ title, id }) => {
  const router = useRouter();
  return (
    <Screen title={title || 'Article'}>
      <Text>Fetch article with ID = {id}</Text>
      <Button onPress={router.pop} title="Custom go back button" />
      <Button
        onPress={() =>
          router.replace('Article', {
            props: { title: 'Article 3 - Replaced', id: 3 },
          })
        }
        title="Replace with Article 3"
      />
      <Button
        onPress={() =>
          router.push('Article', {
            props: { title: 'Article 4 - Push', id: 3 },
          })
        }
        title="Push with Article 4"
      />
      <Button
        onPress={() =>
          router.push('Article', {
            props: { title: 'Article 4 - Push', id: 3 },
          })
        }
        title="Push with Article 4"
      />
    </Screen>
  );
};

const Modal = ({ text, type }) => {
  return (
    <Screen title={type}>
      <Text>{text}</Text>
    </Screen>
  );
};

const Drawer = ({ text, type }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text>My drawer</Text>
    </View>
  );
};

const App = () => {
  return (
    <NavigationProvider
      initial="Home"
      routes={{
        Home: { Component: Home },
        Profile: {
          Component: Profile,
          statusBar: {
            barStyle: 'light-content',
          },
          header: {
            backgroundColor: '#000',
            color: '#fff',
          },
        },
        Article: { Component: Article },
        Drawer: { Component: Drawer },
        Modal: { Component: Modal },
      }}
      router={{
        // Creates helper functions that we can get from `useRouter`-hook
        // The params to the functions will be passed as props to the component
        // Ex. `navigateToArticle({ id: 1, title: 'My article' })`
        navigateToHome: { name: 'Home' },
        navigateToProfile: { name: 'Profile' },
        navigateToArticle: { name: 'Article' },
        navigateToMyModal: { name: 'Modal' },
        navigateToMyHalfPanel: { name: 'Modal' },
        openDrawer: { name: 'Drawer', mode: 'drawer' },
      }}
      renderTab={route => {
        // Will be called for each route
        // If current route is Article we do not want to display the tabs
        if (route.name === 'Article') {
          return null;
        }

        // You can also create an array of all your tab items and then just map them.
        // Tabs and Tabs.Item is just some helper components,
        // You can easily create your own and then navigate to what ever you want
        return (
          <Tabs>
            <Tabs.Item
              route="Home"
              icon={active => (
                <FontAwesome
                  name="home"
                  size={26}
                  color={active ? '#007aff' : 'black'}
                />
              )}
              label={active => (
                <Text style={{ color: active ? '#007aff' : 'black' }}>
                  Home
                </Text>
              )}
              badge={() => <Tabs.Badge number={3} />}
            />
            <Tabs.Item
              route="Profile"
              icon={active => (
                <FontAwesome
                  name="user"
                  size={26}
                  color={active ? '#007aff' : 'black'}
                />
              )}
              label={active => (
                <Text style={{ color: active ? '#007aff' : 'black' }}>
                  Home
                </Text>
              )}
              badge={() => <Tabs.Badge number={3} />}
            />
          </Tabs>
        );
      }}
    />
  );
};
```

## Components

### NavigationProvider

```jsx
<NavigationProvider
  router={{
    // define shortcuts naviigation functions
    navigateToArticle: {
      name: 'Article'
    },
  }}
  routes={{
    Home: {
      name: 'Home',
      statusBar: {
        barStyle: 'light-content|dark-content'
      },
      mode: 'replace|push|drawer|overlay',
      // ignore header if you don't wrap your views with the <Screen> component
      header: {
        backgroundColor: '#000',
        color: '#fff',
      }
    },
    Article: {
      name: 'Article',
    },
  }}
  // renderTab gets called for each route
  // here you can do some conditional render
  renderTab={(route, router) => {
    if (route.name !== 'Home') {
      return null
    }

    return (
      <Tabs>
        <Tabs.Item
          route="Home"
          icon={active => (<Icon name="home"/>)}
          label={active => <Text>Home</Text>)}
          badge={() => <Tabs.Badge number={3} />}
        />
      </Tabs>
    )
  }}
>
```

### Screen

You can wrap all your main views with the `Screen` component. This component will add a header with a title and a back button (if you are deeper then the first screen).

```jsx
const Home = () => <Screen title="Home">{/* rest of your view */}</Screen>;
```

## Hooks

### useScreen

This is help full to get information from the screen you are at.

```jsx
const Home = () => {
  const {
    showBackButton,
    screen: {
      id,
      name,
      mode,
      animated,
      statusBar: { barStyle },
      header: { backgroundColor, color },
    },
  } = useScreen();

  return null;
};
```

### useRouter

If you want to navigate this is the hook!

```jsx
const Home = () => {
  const {
    push,
    pop,
    replace,
    reset,
    // and all the shortcuts you defined in <NavigationProvider router={} />
    navigateToArticle,
  } = useRouter();

  return (
    <>
      <Button
        title="Push"
        onPress={() =>
          push('Article', {
            props: { id: 1 },
            mode: '',
            statusBar: {},
            header: {},
            animated: true,
          })
        }
      />
      <Button title="Shortcut" onPress={() => navigateToArticle({ id: 1 })} />
    </>
  );
};
```
