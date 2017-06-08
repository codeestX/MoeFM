/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/6/7
 * @description:
 */

import React, {Component} from 'react'
import { connect } from 'react-redux'
import {
    FlatList,
    Text,
    View,
    StyleSheet
} from 'react-native'
import Item from '../component/PlayItem'
import GlobalStyle from '../style/global'

class PlayList extends Component {

    handlePoint(song) {
        if (this.props.onPoint) {
            this.props.onPoint(song)
        }
    }

    handleDelete(index) {
        if (this.props.onDelete()) {
            this.props.onDelete(index)
        }
    }

    render() {
        return (
            <View style={{backgroundColor: 'white', height: GlobalStyle.window_height - 50}}>
                <FlatList
                    data={this.props.playList}
                    renderItem={({item, index}) => <Item song={item} index={index} isSelected={this.props.currentIndex === index}
                                                         onPress={this.handlePoint} onDelete={this.handleDelete} />}
                    ItemSeparatorComponent={() => <Text style={styles.separator}/>}
                    keyExtractor={(item, index) => item.id}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    separator : {
        height: 0.5,
        marginLeft: 50,
        backgroundColor: GlobalStyle.text_dark_hint,
    },
});

const mapStateToProps = (state) => {
    return {
        playList: state.songs.playList,
        currentIndex: state.songs.currentIndex
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPoint: (song) => {
            dispatch({type: 'POINT_SONG', song: song})
        },
        onDelete: (index) => {
            dispatch({type: 'DELETE_SONG', index: index})
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayList)