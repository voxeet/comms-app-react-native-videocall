import { defaultTheme as theme } from '@dolbyio/comms-uikit-common';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer';

import { render, mergeStyles } from '../../../../utils/test-utils';

import IconIndicator from './IconIndicator';

const { colors } = theme;

const icon = 'microphone';
const testID = 'testID';
const backgroundColor = 'primary.500';
const iconColor = 'primary.500';

describe('IconIndicator component', () => {
  test('Passes TestID', () => {
    const { getByTestId } = render(<IconIndicator testID={testID} icon={icon} />);
    expect(getByTestId(testID)).not.toBeNull();
  });
  test('Passes given styles', () => {
    const size = 'small';
    const expectedWidth = 24;
    const { getByTestId } = render(
      <IconIndicator testID={testID} backgroundColor={backgroundColor} icon={icon} size={size} />,
    );
    const element = getByTestId(testID);
    const styles = mergeStyles(element.props.style);
    expect(styles.backgroundColor).toBe(colors.primary[500]);
    expect(styles.width).toBe(expectedWidth);
  });
  test('Uses default size as medium', () => {
    const expectedWidth = 32;
    const expectedHeight = 32;
    const { getByTestId } = render(<IconIndicator testID={testID} backgroundColor={backgroundColor} icon={icon} />);
    const element = getByTestId(testID);
    const styles = mergeStyles(element.props.style);
    expect(styles.backgroundColor).toBe(colors.primary[500]);
    expect(styles.width).toBe(expectedWidth);
    expect(styles.height).toBe(expectedHeight);
  });
  test('Uses default backgroundColor as whiteAlpha', () => {
    const size = 'medium';
    const expectedWidth = 32;
    const { getByTestId } = render(<IconIndicator testID={testID} icon={icon} size={size} />);
    const element = getByTestId(testID);
    const styles = mergeStyles(element.props.style);
    expect(styles.backgroundColor).toBe(colors.whiteAlpha[500]);
    expect(styles.width).toBe(expectedWidth);
  });
  test('Uses given iconColor', () => {
    const size = 'small';
    const expectedWidth = 24;
    const expectedHeight = 24;
    const { getByTestId } = render(<IconIndicator testID={testID} icon={icon} iconColor={iconColor} size={size} />);
    const element = getByTestId(testID);
    const styles = mergeStyles(element.props.style);
    expect(styles.backgroundColor).toBe(colors.whiteAlpha[500]);
    expect(styles.width).toBe(expectedWidth);
    expect(styles.height).toBe(expectedHeight);
  });
});

describe('IconIndicator component snapshot', () => {
  test('matches when optional parameters not given', () => {
    const tree = renderer.create(<IconIndicator testID={testID} icon={icon} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('matches when all parameters given', () => {
    const size = 'small';
    const tree = renderer
      .create(
        <IconIndicator
          testID={testID}
          backgroundColor={backgroundColor}
          icon={icon}
          iconColor={iconColor}
          size={size}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
