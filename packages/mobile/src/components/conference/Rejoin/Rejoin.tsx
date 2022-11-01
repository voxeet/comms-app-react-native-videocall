import React from 'react';
import { useIntl } from 'react-intl';

import Button from '../../ui/Button/Button';

const Rejoin = ({ navigateTo }: NavigateTo) => {
  const intl = useIntl();
  return (
    <Button
      title={intl.formatMessage({ id: 'rejoin' })}
      testID="RejoinButton"
      type="secondary"
      onPress={() => {
        navigateTo();
      }}
    />
  );
};

export default Rejoin;
