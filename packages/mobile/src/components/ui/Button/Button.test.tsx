import { defaultTheme as theme } from '@dolbyio/comms-uikit-common';
// eslint-disable-next-line import/no-extraneous-dependencies
import { fireEvent } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer';

import { render } from '../../../utils/test-utils';

import Button, { ButtonMode } from './Button';

const { colors } = theme;

const handlePress = () => {
  // eslint-disable-next-line no-console
  console.log('test');
};
const testID = 'testID';

/** Primary button tests */
describe('Button component - Primary', () => {
  const type = 'primary';
  test('Passes TestID', () => {
    const { getByTestId } = render(
      <Button title="Primary Default" type={type} testID={testID} onPress={handlePress} />,
    );
    expect(getByTestId(testID)).not.toBeNull();
  });
  test('Passes given styles', () => {
    const { getByTestId } = render(
      <Button title="Primary Default" type={type} testID={testID} onPress={handlePress} />,
    );
    const element = getByTestId(testID);
    expect(element).toHaveStyle({ minWidth: 146 });
    expect(element).toHaveStyle({ minHeight: 40 });
    expect(element).toHaveStyle({ paddingHorizontal: 44 });
    expect(element).toHaveStyle({ justifyContent: 'center' });
    expect(element).toHaveStyle({ alignItems: 'center' });
    expect(element).toHaveStyle({ borderRadius: 6 });
    expect(element).toHaveStyle({ backgroundColor: colors.primary[400] });

    const textElement = element.findByType(Text);
    expect(textElement).toHaveStyle({ fontSize: 15 });
    expect(textElement).toHaveStyle({ fontFamily: 'Roboto' });
    expect(textElement).toHaveStyle({ fontWeight: 'bold' });
    expect(textElement).toHaveStyle({ lineHeight: 24 });
    expect(textElement).toHaveStyle({ letterSpacing: 0.25 });
    expect(textElement).toHaveStyle({ textAlign: 'center' });
    expect(textElement).toHaveStyle({ textTransform: 'uppercase' });
    expect(textElement).toHaveStyle({ color: colors.white });
  });
  test('Should invoke method after click', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <Button title="Primary Default" type={type} testID={testID} onPress={mockOnPress} />,
    );
    const element = getByTestId(testID);
    fireEvent(element, 'click');
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});

describe('Button component - Primary Disabled', () => {
  const type = 'primary';
  test('Passes styles', () => {
    const { getByTestId } = render(
      <Button title="Primary Disabled" type={type} disabled testID={testID} onPress={handlePress} />,
    );
    const element = getByTestId(testID);
    expect(element).toHaveStyle({ backgroundColor: colors.grey[200] });
    const textElement = element.findByType(Text);
    expect(textElement).toHaveStyle({ color: colors.white });
  });
  test('Should not invoke method after click', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <Button title="Primary Disabled" type={type} disabled testID={testID} onPress={mockOnPress} />,
    );
    const element = getByTestId(testID);
    fireEvent(element, 'click');
    expect(mockOnPress).toHaveBeenCalledTimes(0);
  });
});

describe('Button component - Primary Danger', () => {
  const type = 'primary';
  test('Passes styles', () => {
    const { getByTestId } = render(
      <Button title="Primary Danger" danger type={type} testID={testID} onPress={handlePress} />,
    );
    const element = getByTestId(testID);
    expect(element).toHaveStyle({ backgroundColor: colors.infoError });
    const textElement = element.findByType(Text);
    expect(textElement).toHaveStyle({ color: colors.white });
  });
  test('Should invoke method after click', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <Button title="Primary Danger" danger type={type} testID={testID} onPress={mockOnPress} />,
    );
    const element = getByTestId(testID);
    fireEvent(element, 'click');
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});

/** Secondary button tests */
describe('Button component - Secondary', () => {
  const type = 'secondary';
  test('Passes given styles', () => {
    const { getByTestId } = render(
      <Button title="Secondary Default" type={type} testID={testID} onPress={handlePress} />,
    );
    const element = getByTestId(testID);
    expect(element).toHaveStyle({ backgroundColor: colors.white });
    expect(element).toHaveStyle({ borderColor: colors.primary[400] });
    const textElement = element.findByType(Text);
    expect(textElement).toHaveStyle({ color: colors.primary[400] });
  });
  test('Should invoke method after click', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <Button title="Primary Default" type={type} testID={testID} onPress={mockOnPress} />,
    );
    const element = getByTestId(testID);
    fireEvent(element, 'click');
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});

describe('Button component - Secondary Disabled', () => {
  const type = 'secondary';
  test('Passes styles', () => {
    const { getByTestId } = render(
      <Button title="Secondary Disabled" type={type} disabled testID={testID} onPress={handlePress} />,
    );
    const element = getByTestId(testID);
    expect(element).toHaveStyle({ backgroundColor: colors.white });
    expect(element).toHaveStyle({ borderColor: colors.grey[200] });
    const textElement = element.findByType(Text);
    expect(textElement).toHaveStyle({ color: colors.grey[200] });
  });
  test('Should not invoke method after click', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <Button title="Secondary Disabled" type={type} disabled testID={testID} onPress={mockOnPress} />,
    );
    const element = getByTestId(testID);
    fireEvent(element, 'click');
    expect(mockOnPress).toHaveBeenCalledTimes(0);
  });
});

describe('Button component - Secondary Danger', () => {
  const type = 'secondary';
  test('Passes styles', () => {
    const { getByTestId } = render(
      <Button title="Secondary Danger" danger type={type} testID={testID} onPress={handlePress} />,
    );
    const element = getByTestId(testID);
    expect(element).toHaveStyle({ backgroundColor: colors.white });
    expect(element).toHaveStyle({ borderColor: colors.infoError });
    const textElement = element.findByType(Text);
    expect(textElement).toHaveStyle({ color: colors.infoError });
  });
  test('Should invoke method after click', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <Button title="Secondary Danger" danger type={type} testID={testID} onPress={mockOnPress} />,
    );
    const element = getByTestId(testID);
    fireEvent(element, 'click');
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});

/** Secondary Dark button tests */
describe('Button component - Secondary Dark', () => {
  const type = 'secondaryDark';
  test('Passes given styles', () => {
    const { getByTestId } = render(
      <Button title="Secondary Dark Default" type={type} testID={testID} onPress={handlePress} />,
    );
    const element = getByTestId(testID);
    expect(element).toHaveStyle({ backgroundColor: colors.grey[900] });
    expect(element).toHaveStyle({ borderColor: colors.primary[400] });
    const textElement = element.findByType(Text);
    expect(textElement).toHaveStyle({ color: colors.white });
  });
  test('Should invoke method after click', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <Button title="Primary Default" type={type} testID={testID} onPress={mockOnPress} />,
    );
    const element = getByTestId(testID);
    fireEvent(element, 'click');
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});

describe('Button component - Secondary Dark Disabled', () => {
  const type = 'secondaryDark';
  test('Passes styles', () => {
    const { getByTestId } = render(
      <Button title="Secondary Dark Disabled" type={type} disabled testID={testID} onPress={handlePress} />,
    );
    const element = getByTestId(testID);
    expect(element).toHaveStyle({ backgroundColor: colors.grey[600] });
    expect(element).toHaveStyle({ borderColor: colors.grey[600] });
    const textElement = element.findByType(Text);
    expect(textElement).toHaveStyle({ color: colors.grey[50] });
  });
  test('Should not invoke method after click', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <Button title="Secondary Dark Disabled" type={type} disabled testID={testID} onPress={handlePress} />,
    );
    const element = getByTestId(testID);
    fireEvent(element, 'click');
    expect(mockOnPress).toHaveBeenCalledTimes(0);
  });
});

describe('Button component - Secondary Dark Danger', () => {
  const type = 'secondaryDark';
  test('Passes styles', () => {
    const { getByTestId } = render(
      <Button title="Secondary Dark Danger" danger type={type} testID={testID} onPress={handlePress} />,
    );
    const element = getByTestId(testID);
    expect(element).toHaveStyle({ backgroundColor: colors.grey[900] });
    expect(element).toHaveStyle({ borderColor: colors.infoError });
    const textElement = element.findByType(Text);
    expect(textElement).toHaveStyle({ color: colors.infoError });
  });
  test('Should invoke method after click', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <Button title="Secondary Dark Danger" danger type={type} testID={testID} onPress={mockOnPress} />,
    );
    const element = getByTestId(testID);
    fireEvent(element, 'click');
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});

/** Button tests with type mismatch */
describe('Button component - type not given', () => {
  test('Passes TestID', () => {
    const { getByTestId } = render(<Button title="No Type" testID={testID} onPress={handlePress} />);
    expect(getByTestId(testID)).not.toBeNull();
  });
  test('Passes given styles', () => {
    const { getByTestId } = render(<Button title="No Type" testID={testID} onPress={handlePress} />);
    const element = getByTestId(testID);
    expect(element).toHaveStyle({ minWidth: 146 });
    expect(element).toHaveStyle({ minHeight: 40 });
    expect(element).toHaveStyle({ paddingHorizontal: 44 });
    expect(element).toHaveStyle({ justifyContent: 'center' });
    expect(element).toHaveStyle({ alignItems: 'center' });
    expect(element).toHaveStyle({ borderRadius: 6 });
    expect(element).not.toHaveStyle({ backgroundColor: colors.primary[400] });

    const textElement = element.findByType(Text);
    expect(textElement).toHaveStyle({ fontSize: 15 });
    expect(textElement).toHaveStyle({ fontFamily: 'Roboto' });
    expect(textElement).toHaveStyle({ fontWeight: 'bold' });
    expect(textElement).toHaveStyle({ lineHeight: 24 });
    expect(textElement).toHaveStyle({ letterSpacing: 0.25 });
    expect(textElement).toHaveStyle({ textAlign: 'center' });
    expect(textElement).toHaveStyle({ textTransform: 'uppercase' });
    expect(textElement).not.toHaveStyle({ color: colors.white });
  });
  test('Should invoke method after click', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(<Button title="No Type" testID={testID} onPress={mockOnPress} />);
    const element = getByTestId(testID);
    fireEvent(element, 'click');
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});

describe('Button component snapshot', () => {
  test('should match default type', () => {
    const tree = renderer.create(<Button title="No Type" testID={testID} onPress={handlePress} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should match Primary default type', () => {
    const type = 'primary';
    const tree = renderer
      .create(<Button title="Primary Default" type={type} testID={testID} onPress={handlePress} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should match Primary disabled type', () => {
    const type = 'primary';
    const tree = renderer
      .create(
        <Button
          title="Primary Default"
          type={type}
          disabled
          danger
          uppercase={false}
          testID={testID}
          onPress={handlePress}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should match Primary danger type', () => {
    const type = 'primary';
    const tree = renderer
      .create(<Button title="Primary Default" type={type} danger testID={testID} onPress={handlePress} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should match Secondary default type', () => {
    const type = 'secondary';
    const tree = renderer
      .create(<Button title="Secondary Default" type={type} testID={testID} onPress={handlePress} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should match Secondary disabled type', () => {
    const type = 'secondary';
    const tree = renderer
      .create(<Button title="Secondary Default" type={type} disabled danger testID={testID} onPress={handlePress} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should match Secondary danger type', () => {
    const type = 'secondary';
    const tree = renderer
      .create(
        <Button title="Secondary Default" type={type} danger uppercase={false} testID={testID} onPress={handlePress} />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should match SecondaryDark default type', () => {
    const type = 'secondaryDark';
    const tree = renderer
      .create(
        <Button title="SecondaryDark Default" type={type} uppercase={false} testID={testID} onPress={handlePress} />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should match SecondaryDark disabled type', () => {
    const type = 'secondaryDark';
    const tree = renderer
      .create(
        <Button title="SecondaryDark Default" type={type} disabled danger testID={testID} onPress={handlePress} />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should match SecondaryDark danger type', () => {
    const type = 'secondaryDark';
    const tree = renderer
      .create(<Button title="SecondaryDark Default" type={type} danger testID={testID} onPress={handlePress} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  /** Button - Loading state(ButtonMode.Loading) tests */

  test('should match Primary Loading button type', () => {
    const type = 'primary';
    const tree = renderer
      .create(
        <Button title="Primary Loading" type={type} testID={testID} mode={ButtonMode.Loading} onPress={handlePress} />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should match Secondary Loading button type', () => {
    const type = 'secondary';
    const tree = renderer
      .create(
        <Button
          title="Secondary Loading"
          type={type}
          testID={testID}
          mode={ButtonMode.Loading}
          onPress={handlePress}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should match SecondaryDark Loading button type', () => {
    const type = 'secondaryDark';
    const tree = renderer
      .create(
        <Button
          title="Secondary Dark Loading"
          type={type}
          testID={testID}
          mode={ButtonMode.Loading}
          onPress={handlePress}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  /** Button - Done state(ButtonMode.Done) tests */

  test('should match Primary Done button type', () => {
    const type = 'primary';
    const tree = renderer
      .create(
        <Button title="Primary Done Button" type={type} testID={testID} mode={ButtonMode.Done} onPress={handlePress} />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should match Secondary Done button type', () => {
    const type = 'secondary';
    const tree = renderer
      .create(
        <Button title="Secondary Done" type={type} testID={testID} mode={ButtonMode.Done} onPress={handlePress} />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should match SecondaryDark Done button type', () => {
    const type = 'secondaryDark';
    const tree = renderer
      .create(
        <Button title="Secondary Dark Done" type={type} testID={testID} mode={ButtonMode.Done} onPress={handlePress} />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  /** Button - Size `s` */

  test('should match Primary button - size small', () => {
    const type = 'primary';
    const tree = renderer
      .create(<Button title="Primary Small Button" type={type} size="s" testID={testID} onPress={handlePress} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  /** Button - Size `m` */

  test('should match Primary button - size medium', () => {
    const type = 'primary';
    const tree = renderer
      .create(<Button title="Primary Medium Button" type={type} size="m" testID={testID} onPress={handlePress} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  /** Button - with left icon */

  test('should match Primary button with left icon', () => {
    const type = 'primary';
    const tree = renderer
      .create(
        <Button title="Primary - Left Icon" type={type} testID={testID} iconLeft="arrowLeft" onPress={handlePress} />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  /** Button - with right icon */

  test('should match Primary button with right icon', () => {
    const type = 'primary';
    const tree = renderer
      .create(
        <Button title="Primary - Right Icon" type={type} testID={testID} iconRight="copy" onPress={handlePress} />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  /** Button - with left and right icon */

  test('should match Primary button with left and right icons', () => {
    const type = 'primary';
    const tree = renderer
      .create(
        <Button
          title="Primary - Left & Right Icon"
          type={type}
          testID={testID}
          iconLeft="arrowLeft"
          iconRight="copy"
          onPress={handlePress}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
