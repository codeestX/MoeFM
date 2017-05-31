/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/5/7
 * @description:
 */

import React, {Component} from 'react'
import PlayerUI from '../component/PlayerUI'
import { connect } from 'react-redux'

class PlayerPage extends Component {

    handleShowList() {
        if (this.props.onShowList) {
            this.props.onShowList()
        }
    }

    handleLast() {
        if (this.props.onLast) {
            this.props.onLast()
        }
    }

    handleNext() {
        if (this.props.onNext) {
            this.props.onNext()
        }
    }

    handleLove() {
        if (this.props.onLove) {
            this.props.onLove()
        }
    }

    handleDownload() {

    }

    render() {
        const { params } = this.props.navigation.state;
        return (
        <PlayerUI
            song={this.props.currentSong}
            onShowList={this.handleShowList.bind(this)}
            onLast={this.handleLast.bind(this)}
            onNext={this.handleNext.bind(this)}
            onLove={this.handleLove.bind(this)}
            onDownload={this.handleDownload.bind(this)}>
        </PlayerUI>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentSong: state.songs.currentSong,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onNext: () => {
            dispatch({type: 'NEXT_SONG'})
        },
        onLast: () => {
            dispatch({type: 'LAST_SONG'})
        },
        onShowList: () => {
            dispatch()
        },
        onLove: () => {
            dispatch()
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerPage)