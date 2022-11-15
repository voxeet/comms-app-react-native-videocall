import React from 'react';
import { View } from 'react-native';
import useTheme from '../../../hooks/useTheme';
import Icon from '../../ui/Icon/Icon';
import Timer from '../../ui/Timer/Timer';
import RecordButton from '../RecordButton/RecordButton';
import Text from '../Text/Text';

import styles from './RecordingActionBar.style';
const RecordingActionBar = () => {
    const {colors, getColor} = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: getColor(colors.grey[800]) }]}>
            <Icon name={'record'}/>
            <View style={{width:8}}/>
            <Timer testID={'RecordingActionBarTimer'}/>
            <View style={{width:4}}/>
            <Text>|</Text>
            <View style={{width:4}}/>
            <Text id='recording'/>
            <View style={{width:4}}/>
            <View style={[styles.circle, {backgroundColor: getColor('infoError')}]}/>
            <View style={styles.button}>
                <RecordButton type='button' testID='RecordButton'/>
            </View>
        </View>
    );
    };

export default RecordingActionBar;