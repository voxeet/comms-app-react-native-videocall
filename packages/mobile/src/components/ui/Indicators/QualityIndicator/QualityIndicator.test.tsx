import { defaultTheme as theme } from '@dolbyio/comms-uikit-common';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer';

import { render, mergeStyles } from '../../../../utils/test-utils';

import QualityIndicator from './QualityIndicator';

const { colors } = theme;

const testID = 'testID';
const qualityLevel = 2;
const backgroundColor = 'grey.800';
const primaryColor = 'primary.500';
const secondaryColor = 'secondary.500';

describe('QualityIndicator component', () => {
  test('Passes TestID', () => {
    const { getByTestId } = render(<QualityIndicator testID={testID} qualityLevel={qualityLevel} />);
    expect(getByTestId(testID)).not.toBeNull();
  });
  test('Should color lines depending on quality', () => {
    const { getByTestId } = render(
      <QualityIndicator
        testID={testID}
        qualityLevel={qualityLevel}
        backgroundColor={backgroundColor}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />,
    );
    const element1 = getByTestId('lineFirst');
    const element2 = getByTestId('lineSecond');
    const element3 = getByTestId('lineThird');
    const element4 = getByTestId('lineFourth');
    const element5 = getByTestId('lineFifth');
    const styles1 = mergeStyles(element1.props.style);
    const styles2 = mergeStyles(element2.props.style);
    const styles3 = mergeStyles(element3.props.style);
    const styles4 = mergeStyles(element4.props.style);
    const styles5 = mergeStyles(element5.props.style);
    expect(styles1.backgroundColor).toBe(qualityLevel >= 1 ? colors.secondary[500] : colors.primary[500]);
    expect(styles2.backgroundColor).toBe(qualityLevel >= 2 ? colors.secondary[500] : colors.primary[500]);
    expect(styles3.backgroundColor).toBe(qualityLevel >= 3 ? colors.secondary[500] : colors.primary[500]);
    expect(styles4.backgroundColor).toBe(qualityLevel >= 4 ? colors.secondary[500] : colors.primary[500]);
    expect(styles5.backgroundColor).toBe(qualityLevel >= 5 ? colors.secondary[500] : colors.primary[500]);
  });
  test('Should use whiteAlpha as backgroundColor in absence of backgroundColor prop', () => {
    const expStyles = {
      boxSizing: 'border-box',
      width: 26,
      height: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      padding: 4,
      borderRadius: 6,
      backgroundColor: colors.whiteAlpha[500],
    };

    const { getByTestId } = render(
      <QualityIndicator
        testID={testID}
        qualityLevel={qualityLevel}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />,
    );
    const element = getByTestId(testID);
    const styles = mergeStyles(element.props.style);
    expect(styles).toMatchObject(expStyles);
  });
  test('Should use primaryColor as fill when qualityLevel is -1', () => {
    const qualityLevel = -1;
    const expStyles = {
      width: 2,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.primary[500],
    };
    const { getByTestId } = render(
      <QualityIndicator
        testID={testID}
        qualityLevel={qualityLevel}
        backgroundColor={backgroundColor}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />,
    );
    const element = getByTestId(testID);
    const styles = mergeStyles(element.props.style);
    expect(styles.backgroundColor).toBe(colors.grey[800]);

    const element1 = getByTestId('lineFirst');
    const element2 = getByTestId('lineSecond');
    const element3 = getByTestId('lineThird');
    const element4 = getByTestId('lineFourth');
    const element5 = getByTestId('lineFifth');
    const styles1 = mergeStyles(element1.props.style);
    const styles2 = mergeStyles(element2.props.style);
    const styles3 = mergeStyles(element3.props.style);
    const styles4 = mergeStyles(element4.props.style);
    const styles5 = mergeStyles(element5.props.style);

    expect(styles1).toMatchObject(expStyles);

    expStyles.height = 6;
    expect(styles2).toMatchObject(expStyles);

    expStyles.height = 8;
    expect(styles3).toMatchObject(expStyles);

    expStyles.height = 10;
    expect(styles4).toMatchObject(expStyles);

    expStyles.height = 12;
    expect(styles5).toMatchObject(expStyles);
  });
  test('Should use default primaryColor as fill when primaryColor is not set', () => {
    const qualityLevel = 3;
    const { getByTestId } = render(
      <QualityIndicator
        testID={testID}
        qualityLevel={qualityLevel}
        backgroundColor={backgroundColor}
        secondaryColor={secondaryColor}
      />,
    );
    const element1 = getByTestId('lineFirst');
    const element2 = getByTestId('lineSecond');
    const element3 = getByTestId('lineThird');
    const element4 = getByTestId('lineFourth');
    const element5 = getByTestId('lineFifth');
    const styles1 = mergeStyles(element1.props.style);
    const styles2 = mergeStyles(element2.props.style);
    const styles3 = mergeStyles(element3.props.style);
    const styles4 = mergeStyles(element4.props.style);
    const styles5 = mergeStyles(element5.props.style);

    expect(styles1.backgroundColor).toBe(qualityLevel >= 1 ? colors.secondary[500] : colors.grey[600]);
    expect(styles2.backgroundColor).toBe(qualityLevel >= 2 ? colors.secondary[500] : colors.grey[600]);
    expect(styles3.backgroundColor).toBe(qualityLevel >= 3 ? colors.secondary[500] : colors.grey[600]);
    expect(styles4.backgroundColor).toBe(qualityLevel >= 4 ? colors.secondary[500] : colors.grey[600]);
    expect(styles5.backgroundColor).toBe(qualityLevel >= 5 ? colors.secondary[500] : colors.grey[600]);
  });
  test('Should use default secondaryColor as fill when secondaryColor is not set', () => {
    const qualityLevel = 5;
    const { getByTestId } = render(
      <QualityIndicator testID={testID} qualityLevel={qualityLevel} backgroundColor={backgroundColor} />,
    );
    const element1 = getByTestId('lineFirst');
    const element2 = getByTestId('lineSecond');
    const element3 = getByTestId('lineThird');
    const element4 = getByTestId('lineFourth');
    const element5 = getByTestId('lineFifth');
    const styles1 = mergeStyles(element1.props.style);
    const styles2 = mergeStyles(element2.props.style);
    const styles3 = mergeStyles(element3.props.style);
    const styles4 = mergeStyles(element4.props.style);
    const styles5 = mergeStyles(element5.props.style);

    expect(styles1.backgroundColor).toBe(qualityLevel >= 1 ? colors.white : colors.grey[600]);
    expect(styles2.backgroundColor).toBe(qualityLevel >= 2 ? colors.white : colors.grey[600]);
    expect(styles3.backgroundColor).toBe(qualityLevel >= 3 ? colors.white : colors.grey[600]);
    expect(styles4.backgroundColor).toBe(qualityLevel >= 4 ? colors.white : colors.grey[600]);
    expect(styles5.backgroundColor).toBe(qualityLevel >= 5 ? colors.white : colors.grey[600]);
  });
});

describe('QualityIndicator component snapshot', () => {
  test('Should match when no optional parameters are specified', () => {
    const qualityLevel = 3;
    const tree = renderer.create(<QualityIndicator testID={testID} qualityLevel={qualityLevel} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Should match when all parameters are specified', () => {
    const qualityLevel = 3;
    const tree = renderer
      .create(
        <QualityIndicator
          testID={testID}
          qualityLevel={qualityLevel}
          backgroundColor={backgroundColor}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
