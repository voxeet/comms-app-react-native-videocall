import { defaultTheme as theme } from '@dolbyio/comms-uikit-common';
import React from 'react';
import { Text } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer';

import { render, mergeStyles } from '../../../utils/test-utils';

import Pill from './Pill';

const { colors } = theme;

const testID = 'testID';
const text = 'TestPill';
const label = 'TestLabel';
const textElm1TestID = `${testID}-text`;
const textElm2TestID = `${testID}-text-local`;

const commonExpStyle = {
  display: 'flex',
  flexDirection: 'row',
  paddingLeft: 8,
  paddingRight: 8,
  paddingTop: 2,
  paddingBottom: 2,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'flex-start',
  borderRadius: 4,
  height: 20,
  maxWidth: 140,
};

const commonTextElmExpStyle = {
  letterSpacing: 0.3,
  lineHeight: 16,
  fontWeight: '600',
  fontFamily: 'Roboto',
  textAlign: 'left',
};

describe('Pill component', () => {
  test('Passes TestID', () => {
    const { getByTestId } = render(<Pill text={text} label={label} testID={testID} />);

    const element = getByTestId(testID);
    expect(element).not.toBeNull();

    const textElmList = element.findAllByType(Text);
    expect(textElmList).toHaveLength(2);

    expect(getByTestId(textElm1TestID)).not.toBeNull();
    expect(getByTestId(textElm2TestID)).not.toBeNull();
  });
  test('matches style with size s', () => {
    const size = 's';
    const expStyles = {
      ...commonExpStyle,
      backgroundColor: colors.white,
    };
    const { getByTestId } = render(<Pill text={text} label={label} active size={size} testID={testID} />);
    const element = getByTestId(testID);
    const styles = mergeStyles(element.props.style);
    expect(styles).toMatchObject(expStyles);

    const textElmList = element.findAllByType(Text);
    expect(textElmList).toHaveLength(2);

    const textElmExpStyle = {
      ...commonTextElmExpStyle,
      fontSize: 10,
      color: colors.purple[400],
    };
    const textElm1Style = mergeStyles(textElmList[0].props.style);
    expect(textElm1Style).toMatchObject(textElmExpStyle);
    expect(textElmList[0].props.children).toBe(text);
    expect(textElmList[0].props.testID).toBe(textElm1TestID);

    const textElm2Style = mergeStyles(textElmList[1].props.style);
    expect(textElm2Style).toMatchObject(textElmExpStyle);
    expect(textElmList[1].props.children).toBe(`(${label})`);
    expect(textElmList[1].props.testID).toBe(textElm2TestID);
  });
  test('matches style with default active/size prop value', () => {
    const expStyles = {
      ...commonExpStyle,
      backgroundColor: colors.whiteAlpha[50],
    };
    const { getByTestId } = render(<Pill text={text} label={label} testID={testID} />);
    const element = getByTestId(testID);
    const styles = mergeStyles(element.props.style);
    expect(styles).toMatchObject(expStyles);

    const textElmList = element.findAllByType(Text);
    expect(textElmList).toHaveLength(2);

    const textElmExpStyle = {
      ...commonTextElmExpStyle,
      fontSize: 12,
      color: colors.white,
    };
    const textElm1Style = mergeStyles(textElmList[0].props.style);
    expect(textElm1Style).toMatchObject(textElmExpStyle);
    expect(textElmList[0].props.children).toBe(text);
    expect(textElmList[0].props.testID).toBe(`${testID}-text`);

    const textElm2Style = mergeStyles(textElmList[1].props.style);
    expect(textElm2Style).toMatchObject(textElmExpStyle);
    expect(textElmList[1].props.children).toBe(`(${label})`);
    expect(textElmList[1].props.testID).toBe(`${testID}-text-local`);
  });
  test('matches style with size m and active false', () => {
    const size = 'm';
    const expStyles = {
      ...commonExpStyle,
      backgroundColor: colors.whiteAlpha[50],
    };
    const { getByTestId } = render(<Pill text={text} label={label} size={size} active={false} testID={testID} />);
    const element = getByTestId(testID);
    const styles = mergeStyles(element.props.style);
    expect(styles).toMatchObject(expStyles);

    const textElmList = element.findAllByType(Text);
    expect(textElmList).toHaveLength(2);

    const textElmExpStyle = {
      ...commonTextElmExpStyle,
      fontSize: 12,
      color: colors.white,
    };
    const textElm1Style = mergeStyles(textElmList[0].props.style);
    expect(textElm1Style).toMatchObject(textElmExpStyle);
    expect(textElmList[0].props.children).toBe(text);
    expect(textElmList[0].props.testID).toBe(`${testID}-text`);

    const textElm2Style = mergeStyles(textElmList[1].props.style);
    expect(textElm2Style).toMatchObject(textElmExpStyle);
    expect(textElmList[1].props.children).toBe(`(${label})`);
    expect(textElmList[1].props.testID).toBe(`${testID}-text-local`);
  });
  test('matches style without label prop', () => {
    const size = 'm';
    const expStyles = {
      ...commonExpStyle,
      backgroundColor: colors.whiteAlpha[50],
    };
    const { getByTestId } = render(<Pill text={text} size={size} active={false} testID={testID} />);
    const element = getByTestId(testID);
    const styles = mergeStyles(element.props.style);
    expect(styles).toMatchObject(expStyles);

    const textElmList = element.findAllByType(Text);
    expect(textElmList).toHaveLength(1);

    const textElmExpStyle = {
      ...commonTextElmExpStyle,
      fontSize: 12,
      color: colors.white,
    };
    const textElm1Style = mergeStyles(textElmList[0].props.style);
    expect(textElm1Style).toMatchObject(textElmExpStyle);
    expect(textElmList[0].props.children).toBe(text);
    expect(textElmList[0].props.testID).toBe(`${testID}-text`);
  });
  test('matches style without text but label prop', () => {
    const size = 'm';
    const expStyles = {
      ...commonExpStyle,
      backgroundColor: colors.white,
    };
    const { getByTestId } = render(<Pill label={label} size={size} active testID={testID} />);
    const element = getByTestId(testID);
    const styles = mergeStyles(element.props.style);
    expect(styles).toMatchObject(expStyles);

    const textElmList = element.findAllByType(Text);
    expect(textElmList).toHaveLength(2);

    const textElmExpStyle = {
      ...commonTextElmExpStyle,
      fontSize: 12,
      color: colors.purple[400],
    };
    const textElm1Style = mergeStyles(textElmList[0].props.style);
    expect(textElm1Style).toMatchObject(textElmExpStyle);
    expect(textElmList[0].props.children).toBe(undefined);
    expect(textElmList[0].props.testID).toBe(`${testID}-text`);

    const textElm2Style = mergeStyles(textElmList[1].props.style);
    expect(textElm2Style).toMatchObject(textElmExpStyle);
    expect(textElmList[1].props.children).toBe(`(${label})`);
    expect(textElmList[1].props.testID).toBe(`${testID}-text-local`);
  });
});

describe('Pill component snapshot', () => {
  test('should match default param configuration', () => {
    const tree = renderer.create(<Pill testID={testID} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should match when size/active prop is s/true', () => {
    const size = 's';
    const tree = renderer.create(<Pill text={text} active size={size} testID={testID} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should match when size/active/label prop is m/false/value', () => {
    const size = 'm';
    const tree = renderer
      .create(<Pill text={text} label={label} active={false} size={size} testID={testID} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
