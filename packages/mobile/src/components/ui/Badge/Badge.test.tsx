import React from 'react';

import { render } from '../../../utils/test-utils';

import Badge from './Badge';

const testID = 'testID';
const backgroundColor = 'primary.500';

describe('Badge component', () => {
  test('Passes TestID', () => {
    const { getByTestId } = render(<Badge testID={testID} backgroundColor={backgroundColor} content="123" />);
    expect(getByTestId(testID)).not.toBeNull();
  });
  test('Passes given styles with content', () => {
    const { getByTestId } = render(<Badge testID={testID} backgroundColor={backgroundColor} content="123" />);
    const element = getByTestId(testID);
    expect(element).toHaveStyle({ borderRadius: 12 });
    expect(element).toHaveStyle({ paddingHorizontal: 8 });
    expect(element).toHaveStyle({ paddingVertical: 0 });
    expect(element).toHaveStyle({ letterSpacing: 0.3 });
    expect(element).toHaveTextContent(`123`);
  });
});
