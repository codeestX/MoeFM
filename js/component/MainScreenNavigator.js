/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/6/15
 * @description:
 */

import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { TabNavigator } from 'react-navigation';

import TabMePage from '../page/TabMePage'
import TabMusicPage from '../page/TabMusicPage'
import TabRadioPage from '../page/TabRadioPage'

export default MainScreenNavigator = TabNavigator({
        Music: {
            screen: TabMusicPage,
            navigationOptions: ({navigation, screenProps}) => ({
                tabBarLabel: 'Music',
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        name={'md-musical-notes'}
                        size={26}
                        color={tintColor}
                    />
                ),
            }),},
        Radio: {
            screen: TabRadioPage,
            navigationOptions: ({navigation, screenProps}) => ({
                tabBarLabel: 'Radio',
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        name={'md-radio'}
                        size={26}
                        color={tintColor}
                    />
                ),
            }),},
        Me: { screen: TabMePage,
            navigationOptions: ({navigation, screenProps}) => ({
                tabBarLabel: 'Me',
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        name={'md-person'}
                        size={26}
                        color={tintColor}
                    />
                ),
            }),},
    }, {
        // tabBarComponent: TabView.TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: true,
        lazy: true,
        tabBarOptions: {
            activeTintColor: 'white',
            inactiveTintColor: '#D0D0D0',
            showIcon: true,
            showLabel: true,
            indicatorStyle: {
                opacity: 0,
                display: 'none'
            },
            style: {backgroundColor: '#000000', opacity: 0.85},
            labelStyle: {fontSize: 9, marginVertical: -2},
        },
    }
);