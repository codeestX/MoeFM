/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/6/15
 * @description:
 */

import React from 'react'
import { Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { TabNavigator } from 'react-navigation';

import TabMePage from '../page/TabMePage'
import TabMusicPage from '../page/TabMusicPage'
import TabRadioPage from '../page/TabRadioPage'

export default MainScreenNavigator = TabNavigator({
        Music: {
            screen: TabMusicPage,
            navigationOptions: ({navigation, screenProps}) => ({
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon
                        name={'md-musical-notes'}
                        size={26}
                        color={focused? screenProps.themeColor: tintColor}
                    />
                ),
                tabBarLabel: ({ focused, tintColor }) => (
                    <Text style={{fontSize: 12, textAlign: 'center', marginBottom: 2,
                        color: focused? screenProps.themeColor: tintColor}}>Music</Text>
                )
            }),},
        Radio: {
            screen: TabRadioPage,
            navigationOptions: ({navigation, screenProps}) => ({
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon
                        name={'md-radio'}
                        size={26}
                        color={focused? screenProps.themeColor: tintColor}
                    />
                ),
                tabBarLabel: ({ focused, tintColor }) => (
                    <Text style={{fontSize: 12, textAlign: 'center', marginBottom: 2,
                        color: focused? screenProps.themeColor: tintColor}}>Radio</Text>
                )
            }),},
        Me: { screen: TabMePage,
            navigationOptions: ({navigation, screenProps}) => ({
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon
                        name={'md-person'}
                        size={26}
                        color={focused? screenProps.themeColor: tintColor}
                    />
                ),
                tabBarLabel: ({ focused, tintColor }) => (
                    <Text style={{fontSize: 12, textAlign: 'center', marginBottom: 2,
                        color: focused? screenProps.themeColor: tintColor}}>Me</Text>
                )
            }),},
    }, {
        // tabBarComponent: TabView.TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: true,
        lazy: true,
        tabBarOptions: {
            activeTintColor: 'black',
            inactiveTintColor: 'gray',
            showIcon: true,
            showLabel: true,
            indicatorStyle: {
                opacity: 0,
                display: 'none'
            },
            style: {backgroundColor: '#EEEEEE', opacity: 0.85},
            labelStyle: {fontSize: 9, marginVertical: -1},
        },
    }
);