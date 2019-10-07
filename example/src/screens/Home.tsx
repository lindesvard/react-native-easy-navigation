import React, { memo } from 'react';
import { Button } from 'react-native';
import { useRouter, Screen } from 'react-native-easy-navigation';

const Home = () => {
  const { push, navigateToModal } = useRouter();

  return (
    <Screen title="Home">
      <Button
        title="Push route"
        onPress={() =>
          push('ExampleStack', {
            props: {
              customTitle: 'Hello world',
            },
          })
        }
      />
      <Button
        title="Push route (no animation)"
        onPress={() =>
          push('ExampleStack', {
            props: {
              customTitle: 'Hello world',
            },
            animated: false,
          })
        }
      />
      <Button title="Open modal" onPress={navigateToModal} />
      <Button
        title="Open half panel"
        onPress={() => push('ExampleHalfPanel', { mode: 'half-panel' })}
      />
    </Screen>
  );
};

export default memo(Home);
