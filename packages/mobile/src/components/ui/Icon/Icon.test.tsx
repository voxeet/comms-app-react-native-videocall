import { defaultTheme as theme } from '@dolbyio/comms-uikit-common';
import Color from 'color';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer';

import { render } from '../../../utils/test-utils';

import Icon, { IconSize } from './Icon';

const name = 'settings';
const testID = 'testID';
const size = 's';
const color = 'primary.500';

const IconSizes: { [key in IconSize]: { width: number; height: number } } = {
  xxs: { width: 10, height: 10 },
  xs: { width: 16, height: 16 },
  s: { width: 18, height: 18 },
  m: { width: 24, height: 24 },
  l: { width: 172, height: 172 },
};

const { colors } = theme;

describe('Icon component', () => {
  test('Passes TestID', () => {
    const { getByTestId } = render(<Icon name={name} testID={testID} />);
    expect(getByTestId(testID)).not.toBeNull();
  });
  test('Passes styles for default colortone', () => {
    const { getByTestId } = render(<Icon name={name} testID={testID} color={color} size={size} />);
    const element = getByTestId(testID);
    expect(element).toHaveProp('fill', colors.primary[500]);
    expect(element).toHaveProp('width', IconSizes[size].width);
    expect(element).toHaveProp('height', IconSizes[size].height);
  });
  test('Passes styles for light colortone', () => {
    const { getByTestId } = render(<Icon name={name} colorTone="light" testID={testID} color={color} size={size} />);
    const element = getByTestId(testID);
    expect(element).toHaveProp('fill', Color(colors.primary[500]).lighten(0.2).hex());
    expect(element).toHaveProp('width', IconSizes[size].width);
    expect(element).toHaveProp('height', IconSizes[size].height);
  });
  test('Passes styles for dark colortone', () => {
    const { getByTestId } = render(<Icon name={name} colorTone="dark" testID={testID} color={color} size={size} />);
    const element = getByTestId(testID);
    expect(element).toHaveProp('fill', Color(colors.primary[500]).darken(0.5).hex());
    expect(element).toHaveProp('width', IconSizes[size].width);
    expect(element).toHaveProp('height', IconSizes[size].height);
  });
  test('Uses default size as m(medium)', () => {
    const size = 'm';
    const { getByTestId } = render(<Icon name={name} testID={testID} color={color} />);
    const element = getByTestId(testID);
    expect(element).toHaveProp('fill', colors.primary[500]);
    expect(element).toHaveProp('width', IconSizes[size].width);
    expect(element).toHaveProp('height', IconSizes[size].height);
  });
  test('Supports xxs size', () => {
    const size = 'xxs';
    const { getByTestId } = render(<Icon name={name} testID={testID} color={color} size={size} />);
    const element = getByTestId(testID);
    expect(element).toHaveProp('fill', colors.primary[500]);
    expect(element).toHaveProp('width', IconSizes[size].width);
    expect(element).toHaveProp('height', IconSizes[size].height);
  });
  test('Supports xs size', () => {
    const size = 'xs';
    const { getByTestId } = render(<Icon name={name} testID={testID} color={color} size={size} />);
    const element = getByTestId(testID);
    expect(element).toHaveProp('fill', colors.primary[500]);
    expect(element).toHaveProp('width', IconSizes[size].width);
    expect(element).toHaveProp('height', IconSizes[size].height);
  });
  test('Supports l size', () => {
    const size = 'l';
    const { getByTestId } = render(<Icon name={name} testID={testID} color={color} size={size} />);
    const element = getByTestId(testID);
    expect(element).toHaveProp('fill', colors.primary[500]);
    expect(element).toHaveProp('width', IconSizes[size].width);
    expect(element).toHaveProp('height', IconSizes[size].height);
  });
});

describe('Icon component snapshot', () => {
  test('matches for dark colortone', () => {
    const tree = renderer
      .create(<Icon name={name} colorTone="dark" testID={testID} color={color} size={size} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
