import { defaultTheme as theme } from '@dolbyio/comms-uikit-common';
// eslint-disable-next-line import/no-extraneous-dependencies
import { fireEvent } from '@testing-library/react-native';
import React from 'react';
import { View, TextInput } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer';

import { render, mergeStyles } from '../../../utils/test-utils';

import Input from './Input';

const { colors } = theme;

const testID = 'testID';
const label = 'testLabel';
const labelColor = 'red.400';
const labelBackground = 'grey.800';
const textColor = 'purple.400';

const onChange = () => {
  // eslint-disable-next-line no-console
  console.log('test');
};

describe('Input component', () => {
  test('Passes TestID', () => {
    const { getByTestId } = render(<Input testID={testID} value="" />);
    expect(getByTestId(testID)).not.toBeNull();
  });

  test('can change border color when text input is in focus', () => {
    const { getByTestId, rerender } = render(<Input testID={testID} value="foo" />);
    const element = getByTestId(testID);
    const viewElmList = element.findAllByType(View);
    const txtInputElm = element.findByType(TextInput);
    // fire focus event on text input element
    fireEvent(txtInputElm, 'focus');
    rerender(<Input testID={testID} value="foo" />);
    let styles = mergeStyles(viewElmList[1].props.style);
    expect(styles.borderColor).toBe(colors.primary[400]);

    // fire blur event on text input element
    fireEvent(txtInputElm, 'blur');
    rerender(<Input testID={testID} value="foo" />);
    styles = mergeStyles(viewElmList[1].props.style);
    expect(styles.borderColor).toBe(colors.grey[100]);
  });

  test('can use infoError as border color, when valid is false', () => {
    const validation = {
      valid: false,
    };
    const { getByTestId, rerender } = render(<Input testID={testID} validation={validation} value="foo" />);
    const element = getByTestId(testID);
    const viewElmList = element.findAllByType(View);
    const txtInputElm = element.findByType(TextInput);

    let styles = mergeStyles(viewElmList[1].props.style);
    expect(styles.borderColor).toBe(colors.infoError);

    // fire focus event on text input element
    fireEvent(txtInputElm, 'focus');
    rerender(<Input testID={testID} validation={validation} value="foo" />);
    styles = mergeStyles(viewElmList[1].props.style);
    expect(styles.borderColor).toBe(colors.infoError);
  });

  test('can change border color when text input is in focus, when valid is true', () => {
    const validation = {
      valid: true,
    };
    const { getByTestId, rerender } = render(<Input testID={testID} validation={validation} value="foo" />);
    const element = getByTestId(testID);
    const viewElmList = element.findAllByType(View);
    const txtInputElm = element.findByType(TextInput);
    // fire focus event on text input element
    fireEvent(txtInputElm, 'focus');
    rerender(<Input testID={testID} value="foo" />);
    let styles = mergeStyles(viewElmList[1].props.style);
    expect(styles.borderColor).toBe(colors.primary[400]);

    // fire blur event on text input element
    fireEvent(txtInputElm, 'blur');
    rerender(<Input testID={testID} validation={validation} value="foo" />);
    styles = mergeStyles(viewElmList[1].props.style);
    expect(styles.borderColor).toBe(colors.grey[100]);
  });

  test('can handle input text and invoke onChange method', () => {
    const mockOnClick = jest.fn();
    const { getByTestId } = render(<Input testID={testID} value="foo" onChange={mockOnClick} />);
    const element = getByTestId(testID);
    const txtInputElm = element.findByType(TextInput);
    fireEvent(txtInputElm, 'onChange', '123');
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});

describe('Input component snapshot', () => {
  test('should match default param configuration', () => {
    const tree = renderer.create(<Input testID={testID} value="foo" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should match with validation.message is set & validation.valid is true & value.length > 0', () => {
    const validation = {
      valid: true,
      message: 'validationMsg',
    };
    const tree = renderer
      .create(
        <Input
          label={label}
          labelColor={labelColor}
          textColor={textColor}
          labelBackground={labelBackground}
          validation={validation}
          testID={testID}
          value="foo"
          onChange={onChange}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should match with validation.message is set & validation.valid is false & value.length == 0', () => {
    const validation = {
      valid: false,
      message: 'validationMsg',
    };
    const tree = renderer
      .create(
        <Input
          label={label}
          labelColor={labelColor}
          textColor={textColor}
          labelBackground={labelBackground}
          validation={validation}
          testID={testID}
          value=""
          onChange={onChange}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should match with validation.message is not set', () => {
    const validation = {
      valid: true,
    };
    const tree = renderer
      .create(
        <Input
          label={label}
          labelColor={labelColor}
          textColor={textColor}
          labelBackground={labelBackground}
          validation={validation}
          testID={testID}
          value=""
          onChange={onChange}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
