/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FormattedMessage } from 'react-intl';

import type { TextValues, TranslationKeys } from '../../../types/translations.types';
import type { CustomTextProps as UITextProps } from '../../ui/Text/Text';
import CustomText from '../../ui/Text/Text';

type TextProps = {
  id?: TranslationKeys;
  values?: TextValues;
} & Partial<UITextProps>;

const Text = ({ id, values, children, ...rest }: TextProps) => {
  return (
    <CustomText {...rest}>{id ? <FormattedMessage id={id} values={values || {}} /> : children || null}</CustomText>
  );
};

export default Text;
