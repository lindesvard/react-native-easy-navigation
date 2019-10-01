# react-native-easy-navigation
Simple and fast navigation for react-native

> Note: Needs `react-native-reanimated` and `react-native-gesture-handler`!

## Table of Contents

- [Why?](#why)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Why?

Well, in most cases I guess the best option this to choose one above but I created this lib so I could create apps faster with less worry about the navigation part.

## Features

- Supports left-to-right transitions for ios and android
- Same transitions on both ios and android
- Drawer support
- Tabs support
- Supports push, replace and pop screens
- Regular screens
- Half panels
- Modals
- Layover

## Installation

Follow the instructions how to install `react-native-gesture-handler` and `react-native-reanimated`. Nothing else is required. Read [Usage](#usage) to get started using the navigation.

## Usage

```js
const Home = () => {
  const router = useRouter()
  return (
    <Screen title="Home">
      <Button onPress={() => router.navigateToArticle({ title: 'Article 1', id: 1 })} title="Go to Article 1"/>
      <Button onPress={() => router.navigateToArticle({ title: 'Article 2', id: 2 })} title="Go to Article 2"/>
    </Screen>
  )
}

const Profile = () => {
  const router = useRouter()
  return (
    <Screen title="Profile">
      <Button onPress={() => router.navigateToMyModal({ text: 'Modal: This is a prop passed to the Modal screen' })} title="Open modal"/>
      <Button onPress={() => router.navigateToMyHalfPanel({ text: 'HalfPanel: This is a prop passed to the Modal screen' })} title="Open half panel"/>
    </Screen>
  )
}

const Article = ({ title, id }) => {
  const router = useRouter()
  return (
    <Screen title={title || 'Article'}>
      <Text>Fetch article with ID = {id}</Text>
      <Button onPress={router.pop} title="Custom go back button"/>
      <Button onPress={() => router.replace('Article', { props: { title: 'Article 3 - Replaced', id: 3 } })} title="Replace with Article 3"/>
      <Button onPress={() => router.push('Article', { props: { title: 'Article 4 - Push', id: 3 } })} title="Push with Article 4"/>
      <Button onPress={() => router.push('Article', { props: { title: 'Article 4 - Push', id: 3 } })} title="Push with Article 4"/>
    </Screen>
  )
}

const Modal = ({ text, type }) => {
  const router = useRouter()
  return (
    <Screen title={type}>
      <Text>{text}</Text>
    </Screen>
  )
}

const App = () => {
  return (
    <NavigationProvider 
      initial="Home"
      routes={{
        Home: { Component: Home },
        Profile: { Component: Profile },
        Article: { Component: Article },
      }}
      router={{
        // Creates helper functions that we can get from `useRouter`-hook
        // The params to the functions will be passed as props to the component
        // Ex. `navigateToArticle({ id: 1, title: 'My article' })`
        navigateToHome: { name: 'Home' },
        navigateToProfile: { name: 'Profile' },
        navigateToArticle: { name: 'Article' },
        navigateToMyModal: { name: 'Modal' }
        navigateToMyHalfPanel: { name: 'Modal' }
      }}
      renderTab={(route) => {
        // Will be called for each route
        // If current route is Article we do not want to display the tabs
        if (route.name === 'Article') {
          return null
        }

        return <Tabs />
      }}
      renderLeftDrawer={route => {
        return null
      }}
      renderRightDrawer={route => {
        return null
      }}
    />
  )
}
```
