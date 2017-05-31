/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/5/7
 * @description:
 */

import React from 'react'
import {
    TouchableNativeFeedback,
    TouchableOpacity,
    Platform,
} from 'react-native'

export default (props) => {
    if(Platform.OS === 'android') {
        return <TouchableNativeFeedback
            delayPressIn={0}
            background={TouchableNativeFeedback.SelectableBackground()}
            {...props}>
            {props.children}
        </TouchableNativeFeedback>;
    }else if(Platform.OS === 'ios') {
        return <TouchableOpacity {...props}>
            {props.children}
        </TouchableOpacity>;
    }
};