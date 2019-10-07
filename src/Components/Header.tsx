import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import { HEADER_HEIGHT, SAFE_AREA_TOP } from '../constants';
import useRouter from '../hooks/useRouter';
import useScreen from '../hooks/useScreen';
import { isHalfPanel, hasYTransition } from '../helpers';
import Title from './Title';
import Icon from './Icon';

interface HeaderHalfPanelProps {
  title: string;
  pop: () => void;
}

interface Props {
  title: string;
}

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT + SAFE_AREA_TOP,
  },
  inner: {
    marginTop: SAFE_AREA_TOP,
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  containerHalfPanel: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  closeButton: { zIndex: 2, marginLeft: 'auto' },
  backButton: { zIndex: 2 },
});

const HeaderHalfPanel = ({ title, pop }: HeaderHalfPanelProps) => {
  return (
    <View style={styles.containerHalfPanel}>
      <Title color="black">{title}</Title>
      <TouchableOpacity
        onPress={pop}
        style={styles.closeButton}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <Icon name="close" size={26} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const Header = ({ title }: Props) => {
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
      style={[
        styles.container,
        {
          backgroundColor,
        },
      ]}
    >
      <View style={styles.inner}>
        {showBackButton && (
          <TouchableOpacity
            onPress={pop}
            style={styles.backButton}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Icon
              name={hasYTransition(mode) ? 'close' : 'chevron-left'}
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
