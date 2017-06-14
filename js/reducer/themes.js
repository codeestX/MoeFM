/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/6/9
 * @description:
 */
import { ThemeFlags } from '../style/theme';
//actions
const CHANGE_THEME = 'CHANGE_THEME';        //更换主题

export default function (state, action) {
    if (!state) {
        state = {
            currentTheme: {themeColor: ThemeFlags.Default},           //当前主题
        }
    }
    switch (action.type) {
        case CHANGE_THEME:
            return {
                    ...state,
                    currentTheme: {
                        ...state.currentTheme,
                        themeColor: action.color
                    }
                };
        default:
            return state
    }
}