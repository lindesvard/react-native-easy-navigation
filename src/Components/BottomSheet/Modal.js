import React, { useState, useEffect, useMemo, memo, useCallback } from "react";
import { Text, View, Keyboard, Dimensions, ScrollView } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { useTransition } from "react-native-redash";
import Content from "./Content";
import Overlay from "./Overlay";
import { SAFE_AREA_BOTTOM, isAndroid } from "../../constants";

const {
  multiply,
  interpolate,
  timing,
  sub,
  cond,
  min,
  greaterThan,
  not
} = Animated;

const screen = Dimensions.get("window");
const AView = Animated.View;
const HEADER_HEIGHT = 40;
const FOOTER_HEIGHT = 70;
const TRANSITION_DURATION = 200;

const isKeyboardVisible = event =>
  screen.height - event.endCoordinates.height === event.endCoordinates.screenY;

const Modal = ({
  distanceFromTop = 100,
  scenes = [],
  onClose = () => {},
  renderFooter
}) => {
  const [visible, setVisible] = useState(0);
  const [position, setPosition] = useState(0);
  const { keyboard, keyboardHeight, heights } = useMemo(
    () => ({
      heights: scenes.map(() => new Animated.Value(0)),
      keyboard: new Animated.Value(0),
      keyboardHeight: new Animated.Value(0)
    }),
    []// eslint-disable-line
  );

  useEffect(() => {
    setVisible(1);
  }, []);

  const transition = useTransition(
    visible,
    not(visible),
    visible,
    TRANSITION_DURATION
  );

  const defaultHeight = new Animated.Value(0);
  const height = heights[position] || defaultHeight;

  const maxContentHeight = node => min(screen.height - distanceFromTop, node);
  const CONTENT_MAX_HEIGHT_KEYBOARD_DOWN = maxContentHeight(height);
  const SAFE_HEIGHT_KEYBOARD_UP = sub(
    sub(screen.height, keyboardHeight),
    distanceFromTop
  );
  const CONTENT_MAX_HEIGHT_KEYBOARD_UP = cond(
    greaterThan(CONTENT_MAX_HEIGHT_KEYBOARD_DOWN, SAFE_HEIGHT_KEYBOARD_UP),
    SAFE_HEIGHT_KEYBOARD_UP,
    CONTENT_MAX_HEIGHT_KEYBOARD_DOWN
  );

  const contentHeight = interpolate(keyboard, {
    inputRange: [0, 1],
    outputRange: [
      CONTENT_MAX_HEIGHT_KEYBOARD_DOWN,
      CONTENT_MAX_HEIGHT_KEYBOARD_UP
    ]
  });

  const close = useCallback(() => {
    onClose && onClose({ finished: position + 1 === scenes.length });
  }, [onClose, position, scenes.length]);

  useEffect(() => {
    const runKeyboardAnimation = toValue =>
      timing(keyboard, {
        duration: 250,
        toValue,
        easing: Easing.out(Easing.ease)
      }).start();

    const keyboardWillChangeFrame = event => {
      keyboardHeight.setValue(event.endCoordinates.height);
      runKeyboardAnimation(isKeyboardVisible(event) ? 1 : 0);
    };
    const keyboardWillShow = event => {
      keyboardHeight.setValue(event.endCoordinates.height);
      runKeyboardAnimation(1);
    };
    const keyboardWillHide = () => {
      runKeyboardAnimation(0);
    };

    if (isAndroid) {
      Keyboard.addListener("keyboardDidShow", keyboardWillShow);
      Keyboard.addListener("keyboardDidHide", keyboardWillHide);
    } else {
      Keyboard.addListener("keyboardWillChangeFrame", keyboardWillChangeFrame);
    }

    return () => {
      if (isAndroid) {
        Keyboard.removeListener("keyboardDidShow", keyboardWillShow);
        Keyboard.removeListener("keyboardDidHide", keyboardWillHide);
      } else {
        Keyboard.removeListener(
          "keyboardWillChangeFrame",
          keyboardWillChangeFrame
        );
      }
    };
  }, [keyboard, keyboardHeight]);

  const keyboardOffset = interpolate(keyboard, {
    inputRange: [0, 1],
    outputRange: [0, multiply(-1, keyboardHeight)]
  });

  const paddingBottom = interpolate(keyboard, {
    inputRange: [0, 1],
    outputRange: [Math.max(SAFE_AREA_BOTTOM, 20), 20]
  });

  const handleLayout = index => ({
    nativeEvent: {
      layout: { height }
    }
  }) => {
    const sceneHeight =
      height +
      (renderFooter ? FOOTER_HEIGHT : 0) +
      (scenes[index].title ? HEADER_HEIGHT : 0) +
      Math.max(SAFE_AREA_BOTTOM, 20);

    heights[index].setValue(sceneHeight);
  };

  return (
    <AView
      style={{
        flex: 1,
        opacity: cond(greaterThan(contentHeight, 0), 1, 0)
      }}
    >
      <Overlay onPress={close} />
      <Content
        style={{
          paddingBottom,
          transform: [
            {
              translateY: keyboardOffset
            }
          ]
        }}
      >
        {scenes.map(({ title, Component, props, key, children }, index) => (
          <Animated.View
            key={key}
            style={{
              width: "100%",
              position: position !== index ? "absolute" : "relative",
              zIndex: position === index ? 1 : -1,
              opacity: position === index ? 1 : 0,
              maxHeight: contentHeight
              // overflow: 'scroll',
            }}
          >
            {title && (
              <View
                alignItems="center"
                justifyContent="center"
                style={{
                  height: HEADER_HEIGHT,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text medium>{title}</Text>
              </View>
            )}

            <ScrollView
              contentContainerStyle={{
                padding: 20
              }}
            >
              <View onLayout={handleLayout(index)}>
                {children || <Component {...props} />}
              </View>
            </ScrollView>
            {renderFooter && (
              <AView
                style={{
                  height: FOOTER_HEIGHT,
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 20
                }}
              >
                {renderFooter({
                  position: position + 1,
                  next: () => {
                    if (position + 1 === scenes.length) {
                      close();
                    } else {
                      setPosition(pos => pos + 1);
                    }
                  },
                  prev: () => {
                    setPosition(pos => pos - 1);
                  },
                  close
                })}
              </AView>
            )}
          </Animated.View>
        ))}
      </Content>
    </AView>
  );
};

export default memo(Modal);
