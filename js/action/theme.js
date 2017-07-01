/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/7/1
 * @description:
 */

export const CHANGE_THEME = 'CHANGE_THEME';        //更换主题

export const changeTheme = (color) => {
    return {
        type: CHANGE_THEME,
        color: color
    };
};