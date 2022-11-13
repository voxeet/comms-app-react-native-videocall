import { defaultTheme as theme } from '@dolbyio/comms-uikit-common';
// eslint-disable-next-line import/no-extraneous-dependencies
import { fireEvent } from '@testing-library/react-native';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer';

import { render, mergeStyles } from '../../../utils/test-utils';

import IconButton from './IconButton';

const icon = 'microphone';
const testID = 'testID';
const backgroundColor = 'grey.800';
const bgColorList = ['grey.800', 'grey.800'];
const badgeTestWrapperID = 'IconButtonBadge';

const { colors } = theme;

const onPress = () => {
  // eslint-disable-next-line no-console
  console.log('test');
};

describe('IconButton component', () => {
  test('Passes TestID', () => {
    const { getByTestId } = render(<IconButton testID={testID} icon={icon} onPress={onPress} />);
    expect(getByTestId(testID)).not.toBeNull();
  });
  test('Passes given styles', () => {
    const type = 'rectangular';
    const { getByTestId } = render(
      <IconButton testID={testID} variant={type} backgroundColor={backgroundColor} icon={icon} onPress={onPress} />,
    );
    const element = getByTestId(testID);
    expect(element).toHaveStyle({ width: 72 });
    expect(element).toHaveStyle({ backgroundColor: colors.grey[800] });
    expect(element).toHaveStyle({ height: 48 });
  });
  test('Should method invoke after click', () => {
    const mockOnClick = jest.fn();
    const { getByTestId } = render(<IconButton testID={testID} icon={icon} onPress={mockOnClick} />);
    const element = getByTestId(testID);
    fireEvent(element, 'click');
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
  test('Should set default type as square', () => {
    const { getByTestId } = render(
      <IconButton testID={testID} backgroundColor={backgroundColor} icon={icon} onPress={onPress} />,
    );
    const element = getByTestId(testID);
    expect(element).toHaveProp('accessibilityState', { disabled: false });
    expect(element).toHaveStyle({ width: 48 });
    expect(element).toHaveStyle({ backgroundColor: colors.grey[800] });
    expect(element).toHaveStyle({ height: 48 });
    expect(element).toHaveStyle({ borderRadius: 6 });
    expect(element).toHaveStyle({ justifyContent: 'center' });
    expect(element).toHaveStyle({ alignItems: 'center' });
    expect(element).toHaveStyle({ overflow: 'hidden' });
    expect(element).toHaveStyle({ opacity: 1 });
    expect(element).toHaveStyle({ borderColor: 'transparent' });
  });
  test('Should disable button if disabled prop is true', () => {
    const mockOnClick = jest.fn();
    const { getByTestId } = render(
      <IconButton testID={testID} backgroundColor={backgroundColor} icon={icon} onPress={mockOnClick} disabled />,
    );
    const element = getByTestId(testID);
    expect(element).toHaveProp('accessibilityState', { disabled: true });
    fireEvent(element, 'click');
    expect(mockOnClick).toHaveBeenCalledTimes(0);
  });
  test('Should set icon without iconColor', () => {
    const { getByTestId } = render(<IconButton testID={testID} icon={icon} onPress={onPress} />);
    const element = getByTestId('Icon');
    expect(element).toHaveProp('width', 24);
    expect(element).toHaveProp('data-file-name', 'SvgMicrophone');
    expect(element).toHaveProp('height', 24);
    expect(element).toHaveProp('fill', '#FFFFFF');
  });
  test('Should set icon with iconColor', () => {
    const { getByTestId } = render(
      <IconButton testID={testID} icon={icon} onPress={onPress} iconColor={backgroundColor} />,
    );
    const element = getByTestId('Icon');
    expect(element).toHaveProp('width', 24);
    expect(element).toHaveProp('data-file-name', 'SvgMicrophone');
    expect(element).toHaveProp('height', 24);
    expect(element).toHaveProp('fill', '#292930');
  });
  test('Should set colorTone to dark if disabled prop is true', () => {
    const { getByTestId } = render(
      <IconButton testID={testID} backgroundColor={backgroundColor} icon={icon} onPress={onPress} disabled />,
    );
    const element = getByTestId('Icon');
    expect(element).toHaveProp('fill', '#808080');
    expect(element).toHaveProp('width', 24);
    expect(element).toHaveProp('data-file-name', 'SvgMicrophone');
    expect(element).toHaveProp('height', 24);
  });
  test.skip('Should render button with linear gradient', () => {
    const type = 'rectangular';
    const { getByTestId } = render(
      <IconButton testID={testID} type={type} backgroundColor={bgColorList} icon={icon} onPress={onPress} />,
    );
    const element = getByTestId(testID);
    expect(element).toHaveStyle({ width: 72 });
    expect(element).toHaveStyle({ backgroundColor: [colors.grey[800], colors.grey[800]] });
    expect(element).toHaveStyle({ height: 48 });
  });

  test('Should render button with badge', () => {
    const badge = 'testBadge';
    const badgeColor = 'red.400';
    const badgeContentColor = 'red.400';
    const strokeColor = 'purple.400';
    const { getByTestId } = render(
      <IconButton
        testID={testID}
        backgroundColor={backgroundColor}
        icon={icon}
        onPress={onPress}
        badge={badge}
        badgeColor={badgeColor}
        badgeContentColor={badgeContentColor}
        strokeColor={strokeColor}
      />,
    );
    const badgeWrapperElm = getByTestId(badgeTestWrapperID);
    let styles = mergeStyles(badgeWrapperElm.props.style);

    let expStyles = {
      borderRadius: 12,
      paddingHorizontal: 8,
      paddingVertical: 0,
      letterSpacing: 0.3,
      fontFamily: 'Roboto',
      backgroundColor: colors.red[400],
    };
    expect(styles).toMatchObject(expStyles);

    const badgeTxtElm = getByTestId('badgeText');
    styles = mergeStyles(badgeTxtElm.props.style);
    expStyles = {
      letterSpacing: 1.22,
      fontSize: 12,
      lineHeight: 20,
      fontWeight: '600',
      fontFamily: 'Roboto',
      color: colors.red[400],
      textAlign: 'center',
    };
    expect(styles).toMatchObject(expStyles);
    expect(badgeTxtElm.props.children).toBe(badge);

    const element = getByTestId(testID);
    expStyles = {
      width: 48,
      height: 48,
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      backgroundColor: '#292930',
      borderWidth: 1,
      borderColor: 'purple.400',
      opacity: 1,
    };
    expect(element.props.style).toMatchObject(expStyles);
  });
});

describe('IconButton component snapshot', () => {
  test('Should match with button enable', () => {
    const type = 'rectangular';
    const tree = renderer
      .create(
        <IconButton testID={testID} type={type} backgroundColor={backgroundColor} icon={icon} onPress={onPress} />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Should match snapshot with button disable', () => {
    const type = 'square';
    const tree = renderer
      .create(
        <IconButton
          testID={testID}
          type={type}
          backgroundColor={backgroundColor}
          icon={icon}
          onPress={onPress}
          disabled
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test.skip('Should match when gradeint is in used', () => {
    const type = 'rectangular';
    const tree = renderer
      .create(<IconButton testID={testID} type={type} backgroundColor={bgColorList} icon={icon} onPress={onPress} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Should match with badge', () => {
    const badge = 'testBadge';
    const badgeColor = 'red.400';
    const badgeContentColor = 'red.400';
    const strokeColor = 'purple.400';
    const tree = renderer
      .create(
        <IconButton
          testID={testID}
          backgroundColor={backgroundColor}
          icon={icon}
          onPress={onPress}
          badge={badge}
          badgeColor={badgeColor}
          badgeContentColor={badgeContentColor}
          strokeColor={strokeColor}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
