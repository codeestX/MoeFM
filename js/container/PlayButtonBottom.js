/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/5/26
 * @description:
 */

import React, {Component} from 'react'
import { connect } from 'react-redux'
import {
    Image,
} from 'react-native'
import { pause } from '../action/song'
import CustomButton from '../component/CustomButton'

class PlayButtonBottom extends Component {

    getPlayIcon(isPlaying) {
        switch (isPlaying) {
            case true:
                return require('../images/bottom_pause.png');
            case false:
                return require('../images/bottom_play.png');
        }
    }

    render() {
        return (
            <CustomButton onPress={() => this.props.onPlay()}>
                <Image style={this.props.innerStyle} source={this.getPlayIcon(this.props.isPlaying)}/>
            </CustomButton>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isPlaying: state.songs.isPlaying,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPlay: () => {
            dispatch(pause())
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayButtonBottom)