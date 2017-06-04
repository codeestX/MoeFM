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
    Slider,
} from 'react-native'
import date from '../util/date'

class PlayerSlider extends Component {

    static defaultProps = {
        progressTime: 0,
        totalTime: 500
    };

    handleChange(value) {
        console.log(value);
        this.props.onChange(value);
    }

    render() {
        return (
            <View style={styles.progress}>
                <Text style={styles.time}>{date.parseSecond2String(this.props.progressTime)}</Text>
                <Slider style={{flex: 1}}
                        maximumValue={this.props.totalTime || 1}
                        value={this.props.progressTime || 0}
                        onSlidingComplete={this.handleChange.bind(this)}
                />
                <Text style={styles.time}>{date.parseSecond2String(this.props.totalTime)}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    progress: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20
    },
    time: {
        fontSize: 10,
    },
});

const mapStateToProps = (state) => {
    return {
        progressTime: state.songs.progressTime,
        totalTime: date.parseString2Second(state.songs.currentSong.time)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (value) => {
            dispatch({type: 'SEEK_PROGRESS', time: value})
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerSlider)