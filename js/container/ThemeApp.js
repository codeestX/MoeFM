/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/6/15
 * @description:
 */

import React, {Component} from 'react'
import {
    AsyncStorage,
} from 'react-native'
import { connect } from 'react-redux'
import { changeTheme } from '../action/theme'
import { ThemeFlags } from '../style/theme';
import RootNavigator from '../component/RootNavigator'

class App extends Component {

    async componentWillMount() {
        //获取默认主题色
        const value = await AsyncStorage.getItem('theme_color');
        if (this.props.onChangeTheme) {
            this.props.onChangeTheme(ThemeFlags[value]);
        }
    }

    render() {
        return (
            <RootNavigator screenProps={this.props.screenProps}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        screenProps: state.themes.currentTheme,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeTheme: (color) => {
            dispatch(changeTheme(color))
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);