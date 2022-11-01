import type { Participant } from '@dolbyio/comms-sdk-react-native/lib/typescript/services/conference/models';
import { defaultTheme as theme } from '@dolbyio/comms-uikit-common';
import React from 'react';
import { Text } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer';

import { render, mergeStyles } from '../../../utils/test-utils';

import Avatar from './Avatar';

const { colors } = theme;

const testID = 'testID';
const textElmTestID = `${testID}-text`;
const borderColor = colors.purple[400];
const confUsr1 = 'FOO';
const confUsr2 = 'UIKIT QA';
const testParticipant: Participant = {
  id: 'testParticipant_id',
  info: {
    avatarUrl: 'http://dummy.avatar.org/',
    externalId: 'testParticipant_external_id',
    name: 'dolby sydney',
  },
  status: 'INACTIVE',
  streams: [],
  type: 'listener',
};

const commonExpStyle = {
  display: 'flex',
  borderWidth: 2,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FAC819',
  borderColor: 'white',
};

const commonTextElmExpStyle = {
  letterSpacing: 1.22,
  fontWeight: '600',
  fontFamily: 'Roboto',
  color: '#FFFFFF',
  textAlign: 'left',
};

describe('Avatar component', () => {
  test('Passes TestID', () => {
    const { getByTestId } = render(<Avatar participant={testParticipant} borderColor={borderColor} testID={testID} />);

    const element = getByTestId(testID);
    expect(element).not.toBeNull();

    const txtElement = getByTestId(textElmTestID);
    expect(txtElement).not.toBeNull();

    const textElmList = element.findAllByType(Text);
    expect(textElmList).toHaveLength(1);
  });
  test('should return null', () => {
    const { getByTestId } = render(<Avatar borderColor={borderColor} testID={testID} />);
    expect(() => {
      getByTestId(testID);
    }).toThrow('Unable to find an element with testID: testID');
  });
  test('matches style with default size', () => {
    const expStyles = {
      ...commonExpStyle,
      height: 80,
      width: 80,
      borderRadius: 40,
    };
    const textElmExpStyle = {
      ...commonTextElmExpStyle,
      fontSize: 32,
      lineHeight: 40,
    };
    const { getByTestId } = render(<Avatar participant={testParticipant} testID={testID} />);
    const element = getByTestId(testID);
    const styles = mergeStyles(element.props.style);
    const txtElement = getByTestId(textElmTestID);
    const textElmStyle = mergeStyles(txtElement.props.style);
    expect(styles).toMatchObject(expStyles);
    expect(textElmStyle).toMatchObject(textElmExpStyle);
  });

  test('matches style with size:xs', () => {
    const expStyles = {
      ...commonExpStyle,
      height: 24,
      width: 24,
      borderRadius: 12,
    };
    const textElmExpStyle = {
      ...commonTextElmExpStyle,
      fontSize: 10,
      lineHeight: 18,
    };

    const size = 'xs';
    const { getByTestId } = render(
      <Avatar participant={testParticipant} size={size} borderColor={borderColor} testID={testID} />,
    );
    const element = getByTestId(testID);
    const styles = mergeStyles(element.props.style);
    const txtElement = getByTestId(textElmTestID);
    const textElmStyle = mergeStyles(txtElement.props.style);
    expect(styles).toMatchObject(expStyles);
    expect(textElmStyle).toMatchObject(textElmExpStyle);
  });
  test('matches style with size:s', () => {
    const expStyles = {
      ...commonExpStyle,
      height: 40,
      width: 40,
      borderRadius: 20,
    };
    const textElmExpStyle = {
      ...commonTextElmExpStyle,
      fontSize: 16.6667,
      lineHeight: 23,
    };
    const size = 's';
    const { getByTestId } = render(
      <Avatar participant={testParticipant} size={size} borderColor={borderColor} testID={testID} />,
    );
    const element = getByTestId(testID);
    const styles = mergeStyles(element.props.style);
    const txtElement = getByTestId(textElmTestID);
    const textElmStyle = mergeStyles(txtElement.props.style);
    expect(styles).toMatchObject(expStyles);
    expect(textElmStyle).toMatchObject(textElmExpStyle);
  });
  test('matches style with size:m', () => {
    const expStyles = {
      ...commonExpStyle,
      height: 48,
      width: 48,
      borderRadius: 24,
    };
    const textElmExpStyle = {
      ...commonTextElmExpStyle,
      fontSize: 20,
      lineHeight: 28,
    };
    const size = 'm';
    const { getByTestId } = render(
      <Avatar participant={testParticipant} size={size} borderColor={borderColor} testID={testID} />,
    );
    const element = getByTestId(testID);
    const styles = mergeStyles(element.props.style);
    const txtElement = getByTestId(textElmTestID);
    const textElmStyle = mergeStyles(txtElement.props.style);
    expect(styles).toMatchObject(expStyles);
    expect(textElmStyle).toMatchObject(textElmExpStyle);
  });
  test('matches style with size:l', () => {
    const expStyles = {
      ...commonExpStyle,
      height: 80,
      width: 80,
      borderRadius: 40,
    };
    const textElmExpStyle = {
      ...commonTextElmExpStyle,
      fontSize: 32,
      lineHeight: 40,
    };
    const size = 'l';
    const { getByTestId } = render(
      <Avatar participant={testParticipant} size={size} borderColor={borderColor} testID={testID} />,
    );
    const element = getByTestId(testID);
    const styles = mergeStyles(element.props.style);
    const txtElement = getByTestId(textElmTestID);
    const textElmStyle = mergeStyles(txtElement.props.style);
    expect(styles).toMatchObject(expStyles);
    expect(textElmStyle).toMatchObject(textElmExpStyle);
  });
  test('matches style for size:m when participant is string type with first&last name only', () => {
    const size = 'm';
    const participant = 'Foo SYDQA';
    const { getByTestId } = render(
      <Avatar participant={participant} size={size} borderColor={borderColor} testID={testID} />,
    );
    const txtElement = getByTestId(textElmTestID);
    expect(txtElement.props.children).toHaveLength(2);
    expect(txtElement.props.children).toMatchObject(['F', 'S']);
  });
  test('matches style for size:l when participant is string type with first&last name only', () => {
    const size = 'l';
    const participant = 'Foo SYDQA';
    const { getByTestId } = render(
      <Avatar participant={participant} size={size} borderColor={borderColor} testID={testID} />,
    );
    const txtElement = getByTestId(textElmTestID);
    expect(txtElement.props.children).toHaveLength(2);
    expect(txtElement.props.children).toMatchObject(['F', 'S']);
  });
  test('matches style for size:l when participant is string type with first&last name only', () => {
    const size = 's';
    const participant = 'Foo SYDQA';
    const { getByTestId } = render(
      <Avatar participant={participant} size={size} borderColor={borderColor} testID={testID} />,
    );
    const txtElement = getByTestId(textElmTestID);
    expect(txtElement.props.children).toHaveLength(2);
    expect(txtElement.props.children).toMatchObject(['F', undefined]);
  });
  test('matches style for size:m when participant is string type with first name only', () => {
    const size = 'm';
    const participant = 'BarSYDQA';
    const { getByTestId } = render(
      <Avatar participant={participant} size={size} borderColor={borderColor} testID={testID} />,
    );
    const txtElement = getByTestId(textElmTestID);
    expect(txtElement.props.children).toHaveLength(2);
    expect(txtElement.props.children).toMatchObject(['B', '']);
  });
  test('matches style for size:s when participant is string type with first name only', () => {
    const size = 's';
    const participant = 'ZooSYDQA';
    const { getByTestId } = render(
      <Avatar participant={participant} size={size} borderColor={borderColor} testID={testID} />,
    );
    const txtElement = getByTestId(textElmTestID);
    expect(txtElement.props.children).toHaveLength(2);
    expect(txtElement.props.children).toMatchObject(['Z', undefined]);
  });
  test('matches style for size:l when participant is Participant type with first&last name only', () => {
    const size = 'm';
    const { getByTestId } = render(
      <Avatar participant={testParticipant} size={size} borderColor={borderColor} testID={testID} />,
    );
    const txtElement = getByTestId(textElmTestID);
    expect(txtElement.props.children).toHaveLength(2);
    expect(txtElement.props.children).toMatchObject(['D', 'S']);
  });
});

describe('Avatar component snapshot', () => {
  test('should match default param configuration', () => {
    const tree = renderer.create(<Avatar participant={confUsr1} testID={testID} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should match for small size and Participant type participant', () => {
    const size = 's';
    const tree = renderer
      .create(<Avatar participant={testParticipant} size={size} borderColor={borderColor} testID={testID} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should match for medium size and string type participant', () => {
    const size = 'm';
    const tree = renderer
      .create(<Avatar participant={confUsr2} size={size} borderColor={borderColor} testID={testID} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
