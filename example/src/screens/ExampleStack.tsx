import React, { memo } from 'react';
import { Button } from 'react-native';
import { useRouter, Screen } from 'react-native-easy-navigation';

type Props = {
  customTitle: string;
};

const ExampleStack = ({ customTitle }: Props) => {
  const { push } = useRouter();

  return (
    <Screen title={customTitle || 'No title provided'}>
      <Button
        title="Push one more route"
        onPress={() =>
          push('ExampleStack', {
            header: {
              backgroundColor: 'green',
              color: 'white',
            },
            props: {
              customTitle: 'With green header',
            },
          })
        }
      />
    </Screen>
  );
};

export default memo(ExampleStack);
