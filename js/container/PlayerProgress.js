/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/5/26
 * @description:
 */

import React, {Component} from 'react'
import { connect } from 'react-redux'
import {
    StyleSheet,
    View,
    Text,
} from 'react-native'
import GlobalStyle from '../style/global'
import date from '../util/date'

class PlayerProgress extends Component {

    static defaultProps = {
        progressTime: 0,
        totalTime: 0
    };

    getCurrentWidth() {
        if (this.props.progressTime && this.props.totalTime) {
            return this.props.progressTime * GlobalStyle.window_width / this.props.totalTime;
        }
        return 0;
    }

    render() {
        return (
            <View style={styles.progress}>
                <Text style={{backgroundColor: '#FFFFFF', width: GlobalStyle.window_width, position: 'relative'}}/>
                <Text style={{backgroundColor: '#FF0000', width: this.getCurrentWidth(), position: 'absolute'}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    progress: {
        height: 3
    },
});

const mapStateToProps = (state) => {
    return {
        progressTime: state.songs.progressTime,
        totalTime: date.parseString2Second(state.songs.currentSong.time)
    }
};

export default connect(
    mapStateToProps,
    null
)(PlayerProgress)