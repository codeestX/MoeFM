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
import CustomButton from '../component/CustomButton'

class PlayButton extends Component {

    getPlayIcon(isPlaying) {
        switch (isPlaying) {
            case true:
                return require('../images/ic_pause.png');
            case false:
                return require('../images/ic_play.png');
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
            dispatch({type: 'PAUSE'})
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayButton)