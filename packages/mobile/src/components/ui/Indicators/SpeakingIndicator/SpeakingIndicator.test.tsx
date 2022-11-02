import { defaultTheme as theme } from '@dolbyio/comms-uikit-common';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer';

// eslint-disable-next-line import/no-extraneous-dependencies
// import 'jest-canvas-mock';

import { render, mergeStyles } from '../../../../utils/test-utils';

import SpeakingIndicator from './SpeakingIndicator';

const { colors } = theme;

const testID = 'testID';
const backgroundColor = 'grey.800';
const iconColor = 'primary.500';

describe('SpeakingIndicator component', () => {
  test('Passes TestID', () => {
    const { getByTestId } = render(<SpeakingIndicator testID={testID} />);
    expect(getByTestId(testID)).not.toBeNull();
  });
  test('Passes given styles', () => {
    const { getByTestId } = render(
      <SpeakingIndicator testID={testID} backgroundColor={backgroundColor} iconColor={iconColor} />,
    );
    const element = getByTestId(testID);
    const styles = mergeStyles(element.props.style);
    expect(styles.backgroundColor).toBe(colors.grey[800]);
    expect(styles.width).not.toBe(24);
  });
  test('Uses whiteAlpha as background color in absence of backgroundColor prop', () => {
    const { getByTestId } = render(<SpeakingIndicator testID={testID} iconColor={iconColor} />);
    const element = getByTestId(testID);
    const styles = mergeStyles(element.props.style);
    expect(styles.backgroundColor).toBe(colors.whiteAlpha[500]);
  });
  test('Uses default size as medium', () => {
    const { getByTestId } = render(<SpeakingIndicator testID={testID} iconColor={iconColor} />);
    const element = getByTestId(testID);
    const styles = mergeStyles(element.props.style);
    expect(styles.backgroundColor).toBe(colors.whiteAlpha[500]);
    expect(styles.width).toBe(32);
    expect(styles.height).toBe(32);
    expect(styles.justifyContent).toBe('center');
    expect(styles.alignItems).toBe('center');
    expect(styles.borderRadius).toBe(100);
  });
  test('Supports small size', () => {
    const size = 'small';
    const { getByTestId } = render(<SpeakingIndicator testID={testID} iconColor={iconColor} size={size} />);
    const element = getByTestId(testID);
    const styles = mergeStyles(element.props.style);
    expect(styles.backgroundColor).toBe(colors.whiteAlpha[500]);
    expect(styles.width).toBe(24);
    expect(styles.height).toBe(24);
    expect(styles.justifyContent).toBe('center');
    expect(styles.alignItems).toBe('center');
    expect(styles.borderRadius).toBe(100);
  });
  test('Supports medium size', () => {
    const size = 'medium';
    const { getByTestId } = render(<SpeakingIndicator testID={testID} iconColor={iconColor} size={size} />);
    const element = getByTestId(testID);
    const styles = mergeStyles(element.props.style);
    expect(styles.width).toBe(32);
    expect(styles.height).toBe(32);
    expect(styles.justifyContent).toBe('center');
    expect(styles.alignItems).toBe('center');
    expect(styles.borderRadius).toBe(100);
  });
});

describe('SpeakingIndicator component snapshot', () => {
  test('matches for small size with given styles', () => {
    const size = 'small';
    const tree = renderer
      .create(<SpeakingIndicator testID={testID} backgroundColor={backgroundColor} iconColor={iconColor} size={size} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('matches for medium size without iconColor and backgroundColor prop', () => {
    const size = 'medium';
    // iconColor prop is not set, so that colors.white is used by LottieView
    // backgroundColor is not set, so that parent view element uses colors.whiteAlpha
    const tree = renderer.create(<SpeakingIndicator testID={testID} size={size} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
