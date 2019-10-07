import React, { memo } from 'react';
import { Text } from 'react-native';
import { Screen } from 'react-native-easy-navigation';

const Gallery = () => {
  return (
    <Screen title="Gallery">
      <Text>My gallery</Text>
    </Screen>
  );
};

export default memo(Gallery);
