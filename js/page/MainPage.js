/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/4/18
 * @description:
 */

import React, {Component} from 'react'
import {
    StyleSheet,
} from 'react-native'
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, TabNavigator, TabView } from 'react-navigation';
import { ThemeFlags } from '../style/theme';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons';

import TabMePage from './TabMePage'
import TabMusicPage from './TabMusicPage'
import TabRadioPage from './TabRadioPage'
import DetailPage from './DetailPage'
import PlayerPage from './PlayerPage'

import songs from  '../reducer/songs'
import playerMiddleware from '../middleware/player'


const rootReducer = combineReducers({
    songs,
});

const store = createStore(rootReducer,
    applyMiddleware(playerMiddleware));

export default class MainPage extends Component {

    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

const MainScreenNavigator = TabNavigator({
    Music: {
        screen: TabMusicPage,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name={'md-musical-notes'}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
        },},
    Radio: { screen: TabRadioPage,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name={'md-radio'}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
        },},
    Me: { screen: TabMePage,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name={'md-person'}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
        },},
    }, {
    // tabBarComponent: TabView.TabBarTop,
    // tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    lazy: true,
    tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: '#E8E8E8',
        showIcon: true,
        showLabel: false,
        style: {backgroundColor: ThemeFlags.Default},
        }
    }
);

const App = StackNavigator({
    Home: { screen: MainScreenNavigator ,
            navigationOptions: ({navigation}) => ({
            title: 'MoeFM',
            // headerRight: _renderSearchView,
            headerStyle: styles.tabMenu,
            headerTitleStyle: styles.tabTitle,
            headerTintColor: 'white',
    }),},
    Detail: { screen: DetailPage ,
        navigationOptions: ({navigation}) => ({
            headerStyle: styles.tabMenu,
            headerTitleStyle: styles.tabTitle,
            headerTintColor: 'white',
    }),},
    Player: { screen: PlayerPage ,
        navigationOptions: ({navigation}) => ({
            headerStyle: styles.transparentTitle,
            // headerTitleStyle: styles.tabTitle,
            // headerTintColor: 'white',
        }),},
});

let styles = StyleSheet.create({
    tabMenu: {
        backgroundColor: ThemeFlags.Default,
        justifyContent: 'center',
    },
    tabTitle: {
        color: 'white',
        alignSelf: 'center'
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