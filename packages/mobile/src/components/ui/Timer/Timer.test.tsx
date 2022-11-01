import React from 'react';
import { Text } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer';

import { render } from '../../../utils/test-utils';

import Timer from './Timer';

const testID = 'testID';
const hourTestID = 'testID-hour';
const minTestID = 'testID-min';
const secTestID = 'testID-sec';

beforeEach(() => {
  // use fake timer
  jest.useFakeTimers();
});

afterEach(() => {
  // restore timer
  jest.useRealTimers();
});

describe('Timer component', () => {
  test('Passes TestID', () => {
    const { getByTestId } = render(<Timer testID={testID} />);

    const element = getByTestId(testID);
    expect(element).not.toBeNull();

    const textElmList = element.findAllByType(Text);
    expect(textElmList).toHaveLength(3);

    const hourElm = getByTestId(hourTestID);
    const minElm = getByTestId(minTestID);
    const secElm = getByTestId(secTestID);
    expect(hourElm).not.toBeNull();
    expect(minElm).not.toBeNull();
    expect(secElm).not.toBeNull();
  });
  test('display seconds value < 10', () => {
    const { getByTestId } = render(<Timer testID={testID} />);
    const hourElm = getByTestId(hourTestID);
    const minElm = getByTestId(minTestID);
    const secElm = getByTestId(secTestID);
    renderer.act(() => {
      // bump up timer value by 2 second
      jest.advanceTimersByTime(2000);
    });
    expect(hourElm.props.children).toBe(null);
    expect(minElm.props.children).toBe('00:');
    expect(secElm.props.children).toBe('02');
  });
  test('display seconds value > 10', () => {
    const { getByTestId } = render(<Timer testID={testID} />);
    const hourElm = getByTestId(hourTestID);
    const minElm = getByTestId(minTestID);
    const secElm = getByTestId(secTestID);
    renderer.act(() => {
      // bump up timer value by 59 second
      jest.advanceTimersByTime(59000);
    });
    expect(hourElm.props.children).toBe(null);
    expect(minElm.props.children).toBe('00:');
    expect(secElm.props.children).toBe(59);
  });
  test('display minutes value < 10', () => {
    const { getByTestId, rerender } = render(<Timer testID={testID} />);
    const hourElm = getByTestId(hourTestID);
    const minElm = getByTestId(minTestID);
    const secElm = getByTestId(secTestID);

    const totalTime = 2; // 02 minutes
    for (let i = 1; i <= totalTime; i++) {
      renderer.act(() => {
        jest.advanceTimersByTime(60000);
      });

      rerender(<Timer testID={testID} />);
    }
    expect(hourElm.props.children).toBe(null);
    expect(minElm.props.children).toBe('02:');
    expect(secElm.props.children).toBe('00');
  });
  test('display minutes value > 10', () => {
    const { getByTestId, rerender } = render(<Timer testID={testID} />);
    const hourElm = getByTestId(hourTestID);
    const minElm = getByTestId(minTestID);
    const secElm = getByTestId(secTestID);

    const totalTime = 11; // 11 minutes
    for (let i = 1; i <= totalTime; i++) {
      // each rendering increments the timer value by 1 minute
      renderer.act(() => {
        jest.advanceTimersByTime(60000);
      });

      rerender(<Timer testID={testID} />);
    }
    expect(hourElm.props.children).toBe(null);
    expect(minElm.props.children).toBe('11:');
    expect(secElm.props.children).toBe('00');
  });
  test('display hours value < 10', () => {
    const { getByTestId, rerender } = render(<Timer testID={testID} />);
    const hourElm = getByTestId(hourTestID);
    const minElm = getByTestId(minTestID);
    const secElm = getByTestId(secTestID);

    const totalTime = 60; // 1 hours
    for (let i = 1; i <= totalTime; i++) {
      // each rendering increments the timer value by 60 seconds
      renderer.act(() => {
        jest.advanceTimersByTime(60000);
      });

      rerender(<Timer testID={testID} />);
    }
    expect(hourElm.props.children).toBe('01:');
    expect(minElm.props.children).toBe('00:');
    expect(secElm.props.children).toBe('00');
  });
  test('display hours value > 10', () => {
    const { getByTestId, rerender } = render(<Timer testID={testID} />);
    const hourElm = getByTestId(hourTestID);
    const minElm = getByTestId(minTestID);
    const secElm = getByTestId(secTestID);
    const totalTime = 60 * 11; // 11 hours
    for (let i = 1; i <= totalTime; i++) {
      // each rendering increments the timer value by 60 seconds
      renderer.act(() => {
        jest.advanceTimersByTime(60000);
      });

      rerender(<Timer testID={testID} />);
    }
    expect(hourElm.props.children).toBe('11:');
    expect(minElm.props.children).toBe('00:');
    expect(secElm.props.children).toBe('00');
  });

  test('display hours:minutes:seconds value', () => {
    const { getByTestId, rerender } = render(<Timer testID={testID} />);
    const hourElm = getByTestId(hourTestID);
    const minElm = getByTestId(minTestID);
    const secElm = getByTestId(secTestID);

    let totalTime = 60; // 1 hours
    for (let i = 1; i <= totalTime; i++) {
      // each rendering increments the timer value by 60 seconds
      renderer.act(() => {
        jest.advanceTimersByTime(60000);
      });

      rerender(<Timer testID={testID} />);
    }

    // change minutes value
    totalTime = 2; // 02 minutes
    for (let i = 1; i <= totalTime; i++) {
      // each rendering increments the timer value by 1 minute
      renderer.act(() => {
        jest.advanceTimersByTime(60000);
      });

      rerender(<Timer testID={testID} />);
    }

    // change second value
    renderer.act(() => {
      jest.advanceTimersByTime(9000);
    });
    rerender(<Timer testID={testID} />);

    expect(hourElm.props.children).toBe('01:');
    expect(minElm.props.children).toBe('02:');
    expect(secElm.props.children).toBe('09');
  });
});

describe('Timer component snapshot', () => {
  test('should match default', () => {
    const tree = renderer.create(<Timer testID={testID} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
