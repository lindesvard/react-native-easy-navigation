import React, { memo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from '../Icon';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  button: {
    zIndex: 2,
  },
});

type Props = {
  title: string | undefined;
  onNext: (() => void) | undefined;
  onPrev: (() => void) | undefined;
  onClose: (() => void) | undefined;
};

const hitSlop = { top: 10, right: 10, left: 10, bottom: 10 };

const Header = ({ title, onNext, onPrev, onClose }: Props) => {
  return (
    <View style={styles.header}>
      {onPrev ? (
        <TouchableOpacity
          onPress={onPrev}
          style={styles.button}
          hitSlop={hitSlop}
        >
          <Icon name="chevron-left" size={20} />
        </TouchableOpacity>
      ) : (
        <View />
      )}
      <View style={styles.titleContainer}>
        <Text>{title}</Text>
      </View>
      {(onClose || onNext) && (
        <TouchableOpacity
          onPress={onClose || onNext}
          style={[styles.button]}
          hitSlop={hitSlop}
        >
          <Icon name={onClose ? 'close' : 'chevron-right'} size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(Header);
