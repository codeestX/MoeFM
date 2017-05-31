/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/4/26
 * @description:
 */

import {
    Dimensions,
} from 'react-native'

const {height, width} = Dimensions.get('window');

const uiHeightPx = 640;

function px2dp(uiElementPx) {
    return uiElementPx *  height / uiHeightPx;
}

module.exports ={
    window_height:height,
    window_width:width,
    px2dp,
};