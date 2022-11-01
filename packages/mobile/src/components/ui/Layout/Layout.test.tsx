import { defaultTheme as theme } from '@dolbyio/comms-uikit-common';
import React from 'react';
import { Text } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer';

import { render, mergeStyles } from '../../../utils/test-utils';

import Layout from './Layout';

const { colors } = theme;

const testID = 'testID';
const customComponent = <Text testID="say-hello">Hello World</Text>;
const bgColor = 'grey.800';

describe('Layout component', () => {
  test('Passes TestID', () => {
    const { getByTestId } = render(<Layout testID={testID}>Hello World</Layout>);
    expect(getByTestId(testID)).not.toBeNull();
  });

  test('Should render children correctly', () => {
    const { getByTestId } = render(<Layout testID={testID}>{customComponent}</Layout>);
    const element = getByTestId('say-hello');
    expect(element).not.toBeNull();
    expect(element).toHaveTextContent('Hello World');
    // default backgroundColor valiation
    const layoutElm = getByTestId(testID);
    const styles = mergeStyles(layoutElm.props.style);
    expect(styles.backgroundColor).toBe(colors.background);
  });

  test('Should use given backgroundColor', () => {
    const { getByTestId } = render(
      <Layout backgroundColor={bgColor} testID={testID}>
        {customComponent}
      </Layout>,
    );
    const layoutElm = getByTestId(testID);
    const styles = mergeStyles(layoutElm.props.style);
    expect(styles.backgroundColor).toBe(colors.grey[800]);
  });
});

describe('Layout component snapshot', () => {
  test('should match default param configuration', () => {
    const tree = renderer.create(<Layout testID={testID}>{customComponent}</Layout>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should match with given backgroundColor', () => {
    const tree = renderer
      .create(
        <Layout backgroundColor={bgColor} testID={testID}>
          {customComponent}
        </Layout>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
