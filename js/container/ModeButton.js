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

class ModeButton extends Component {

    getModeIcon(mode) {
        switch (mode) {
            case 'loop':
                return require('../images/ic_mode_loop.png');
            case 'shuffle':
                return require('../images/ic_mode_shuffle.png');
            case 'one':
                return require('../images/ic_mode_one.png');
        }
    }

    render() {
        return (
            <CustomButton onPress={() => this.props.onSwitchMode()}>
                <Image style={this.props.innerStyle} source={this.getModeIcon(this.props.playMode)}/>
            </CustomButton>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        playMode: state.songs.playMode,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSwitchMode: () => {
            dispatch({type: 'SWITCH_MODE'})
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModeButton)


