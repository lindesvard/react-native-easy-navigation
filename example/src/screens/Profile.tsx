import React, { memo } from 'react';
import { Text } from 'react-native';
import { Screen } from 'react-native-easy-navigation';

const Profile = () => {
  return (
    <Screen title="Profile">
      <Text>Profile</Text>
    </Screen>
  );
};

export default memo(Profile);
