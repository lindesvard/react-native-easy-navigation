import React, { useEffect, useMemo, memo, useCallback, useState } from 'react';
import {
  View,
  Keyboard,
  Dimensions,
  ScrollView,
  StyleSheet,
  LayoutChangeEvent,
} from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import Overlay from './Overlay';
import { SAFE_AREA_BOTTOM, isAndroid } from '../../constants';
import useRouter from '../../hooks/useRouter';
import DefaultHeader from './Header';

const HEADER_HEIGHT = 60;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    bottom: 0,
    backgroundColor: '#fff',
    position: 'absolute',
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  scene: {
    width: '100%',
    zIndex: -1,
    opacity: 0,
    position: 'absolute',
  },
  sceneAbsolute: {
    position: 'relative',
    zIndex: 1,
    opacity: 1,
  },
});

const { multiply, interpolate, timing, sub, cond, min, greaterThan } = Animated;

const screen = Dimensions.get('window');

const isKeyboardVisible = (event: any) =>
  screen.height - event.endCoordinates.height === event.endCoordinates.screenY;

type Props = {
  scenes: React.ElementType[];
  Header?: React.ElementType | null;
  distanceFromTop?: number;
  title?: string | ((options: { index: number }) => string | undefined | null);
};

const Modal = ({
  distanceFromTop = 100,
  scenes = [],
  Header: CustomHeader = null,
  title = '',
}: Props) => {
  const [position, setPosition] = useState(0);
  const { pop } = useRouter();
  const { keyboard, keyboardHeight, heights } = useMemo(
    () => ({
      heights: scenes.map(() => new Animated.Value(0)),
      keyboard: new Animated.Value(0),
      keyboardHeight: new Animated.Value(0),
    }),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const defaultHeight = new Animated.Value(0);
  const height = heights[position] || defaultHeight;

  const maxContentHeight = (node: Animated.Value<number>) =>
    min(screen.height - distanceFromTop, node);
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
      CONTENT_MAX_HEIGHT_KEYBOARD_UP,
    ],
  });

  const close = useCallback(() => {
    pop();
  }, [pop]);

  useEffect(() => {
    const runKeyboardAnimation = (toValue: number) =>
      timing(keyboard, {
        duration: 250,
        toValue,
        easing: Easing.out(Easing.ease),
      }).start();

    const keyboardWillChangeFrame = (event: any) => {
      keyboardHeight.setValue(event.endCoordinates.height);
      runKeyboardAnimation(isKeyboardVisible(event) ? 1 : 0);
    };
    const keyboardWillShow = (event: any) => {
      keyboardHeight.setValue(event.endCoordinates.height);
      runKeyboardAnimation(1);
    };
    const keyboardWillHide = () => {
      runKeyboardAnimation(0);
    };

    if (isAndroid) {
      Keyboard.addListener('keyboardDidShow', keyboardWillShow);
      Keyboard.addListener('keyboardDidHide', keyboardWillHide);
    } else {
      Keyboard.addListener('keyboardWillChangeFrame', keyboardWillChangeFrame);
    }

    return () => {
      if (isAndroid) {
        Keyboard.removeListener('keyboardDidShow', keyboardWillShow);
        Keyboard.removeListener('keyboardDidHide', keyboardWillHide);
      } else {
        Keyboard.removeListener(
          'keyboardWillChangeFrame',
          keyboardWillChangeFrame
        );
      }
    };
  }, [keyboard, keyboardHeight]);

  const keyboardOffset = interpolate(keyboard, {
    inputRange: [0, 1],
    outputRange: [0, multiply(-1, keyboardHeight)],
  });

  const paddingBottom = interpolate(keyboard, {
    inputRange: [0, 1],
    outputRange: [Math.max(SAFE_AREA_BOTTOM, 20), 20],
  });

  const handleLayout = (index: number) => ({
    nativeEvent: {
      layout: { height },
    },
  }: LayoutChangeEvent) => {
    const sceneHeight =
      (Header ? HEADER_HEIGHT : 0) + height + Math.max(SAFE_AREA_BOTTOM, 20);

    heights[index].setValue(sceneHeight as Animated.Adaptable<any>);
  };

  const isLast = position + 1 >= scenes.length;
  const hasNext = position < scenes.length;
  const hasPrev = position !== 0;
  const Header = CustomHeader || DefaultHeader;

  const next = () => {
    if (isLast) {
      close();
    } else {
      setPosition(prev => prev + 1);
    }
  };

  const prev = () => {
    if (!hasPrev) {
      close();
    } else {
      setPosition(prev => prev - 1);
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: cond(greaterThan(contentHeight, 0), 1, 0) },
      ]}
    >
      <Overlay onPress={close} />
      <Animated.View
        style={[
          styles.inner,
          {
            paddingBottom,
            transform: [
              {
                translateY: keyboardOffset,
              },
            ],
          },
        ]}
      >
        {scenes.map((Scene, index) => (
          <Animated.View
            key={index}
            style={[
              styles.scene,
              position === index && styles.sceneAbsolute,
              {
                maxHeight: contentHeight,
              },
            ]}
          >
            <ScrollView stickyHeaderIndices={CustomHeader || title ? [0] : []}>
              <View style={styles.header}>
                <Header
                  onPrev={hasPrev ? prev : undefined}
                  onNext={hasNext ? next : undefined}
                  onClose={isLast ? close : undefined}
                  title={typeof title === 'function' ? title({ index }) : title}
                />
              </View>
              <View onLayout={handleLayout(index)}>
                <Scene />
              </View>
            </ScrollView>
          </Animated.View>
        ))}
      </Animated.View>
    </Animated.View>
  );
};

export default memo(Modal);
