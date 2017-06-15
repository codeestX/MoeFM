/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/6/15
 * @description:
 */

import React from 'react'
import {
    StyleSheet,
} from 'react-native'
import { StackNavigator} from 'react-navigation';
import { ThemeFlags } from '../style/theme';

import MainScreenNavigator from './MainScreenNavigator'
import DetailPage from '../page/DetailPage'
import PlayerPage from '../page/PlayerPage'
import ThemePage from '../page/ThemePage'

export default RootNavigator = StackNavigator({
    Home: { screen: MainScreenNavigator ,
        navigationOptions: ({navigation, screenProps}) => ({
            title: 'MoeFM',
            // headerRight: _renderSearchView,
            headerStyle: tabMenuStyle(screenProps),
            headerTitleStyle: styles.tabTitleCenter,
            headerTintColor: 'white',
        }),},
    Detail: { screen: DetailPage ,
        navigationOptions: ({navigation, screenProps}) => ({
            headerStyle: tabMenuStyle(screenProps),
            headerTitleStyle: styles.tabTitleLeft,
            headerTintColor: 'white',
        }),},
    Player: { screen: PlayerPage ,
        navigationOptions: ({navigation, screenProps}) => ({
            headerStyle: styles.transparentTitle,
        }),},
    Theme: { screen: ThemePage ,
        navigationOptions: ({navigation, screenProps}) => ({
            title: 'Colorful Theme',
            headerStyle: tabMenuStyle(screenProps),
            headerTitleStyle: styles.tabTitleCenter,
            headerTintColor: 'white',
        }),},
});

const tabMenuStyle = (screenProps) => {
    return {
        backgroundColor: screenProps === undefined? ThemeFlags.Default: screenProps.themeColor,
        justifyContent: 'center',
    }
};

let styles = StyleSheet.create({
    tabTitleCenter: {
        color: 'white',
        alignSelf: 'center'
    },
    tabTitleLeft: {
        color: 'white',
        alignSelf: 'flex-start'
    },
    transparentTitle: {
        position: 'absolute',
        backgroundColor: 'transparent',
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0
    }
});