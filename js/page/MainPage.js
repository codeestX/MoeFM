/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/4/18
 * @description:
 */

import React, {Component} from 'react'
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'

import ThemeApp from '../container/ThemeApp'
import songs from  '../reducer/songs'
import themes from  '../reducer/themes'
import playerMiddleware from '../middleware/player'
import streamMiddleware from '../middleware/stream'


const rootReducer = combineReducers({
    songs,
    themes,
});

const store = createStore(rootReducer,
    applyMiddleware(streamMiddleware));

export default class MainPage extends Component {

    render() {
        return (
            <Provider store={store}>
                <ThemeApp />
            </Provider>
        );
    }
}