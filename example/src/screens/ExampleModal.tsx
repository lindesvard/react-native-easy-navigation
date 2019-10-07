import React, { memo } from 'react';
import { Button } from 'react-native';
import { useRouter, Screen } from 'react-native-easy-navigation';

const ExampleModal = () => {
  const { navigateToModal, pop, push } = useRouter();

  return (
    <Screen title="Modal">
      <Button title="One more modal?" onPress={navigateToModal} />
      <Button title="Close modal?" onPress={pop} />
      <Button
        title="Push route"
        onPress={() =>
          push('ExampleStack', {
            header: {
              backgroundColor: 'blue',
              color: 'white',
            },
            props: {
              customTitle: 'With blue header',
            },
          })
        }
      />
    </Screen>
  );
};

export default memo(ExampleModal);
