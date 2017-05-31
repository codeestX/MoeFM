/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/5/7
 * @description:
 */

import {
    Dimensions,
} from 'react-native'

const {height, width} = Dimensions.get('window');

module.exports = {
    window_height: height,
    window_width: width,
    text_dark_primary: '#000000DE',
    text_dark_second: '#00000089',
    text_dark_hint: '#00000042',
    text_light_primary: '#FFFFFFFF',
    text_light_second: '#FFFFFFB2',
    text_light_hint: '#FFFFFF4C',
    divider_dark: '#0000001E',
    divider_light: '#FFFFFF1E',
};