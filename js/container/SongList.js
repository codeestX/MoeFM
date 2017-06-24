/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/6/24
 * @description:
 */

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
} from 'react-native'
import { connect } from 'react-redux'
import Item from '../component/SongItem'
import GlobalStyles from  '../style/global'
import {
    CoordinatorLayout,
} from 'react-native-bottom-sheet-behavior'
import CustomButton from '../component/CustomButton'
import PlayerUIBottom from '../container/PlayerUIBottom'

class SongList extends Component {

    static defaultProps = {
        subsData: []
    };

    parseDataNum() {
        return this.props.subsData.filter((it) => it.url !== undefined).length
    }

    handleAddAll() {
        if (this.props.onAddSongs) {
            this.props.onAddSongs(this.props.subsData);
        }
    }

    renderHeader() {
        return (
            <View>
                <View style={{justifyContent: 'flex-end'}}>
                    <Image style={{alignSelf: 'stretch'}} source={{uri: this.props.wiki.cover, height: 240}}/>
                    <Text style={styles.title} numberOfLines={1}>{this.props.wiki.title}</Text>
                </View>
                {this.props.wiki.intro !== undefined && <Text style={ styles.intro}>{this.props.wiki.intro}</Text>}
                <CustomButton disabled={this.parseDataNum() === 0 } onPress={this.handleAddAll.bind(this)}>
                    <View style={this.parseDataNum() === 0? styles.addAllContainerNone: styles.addAllContainer}>
                        <Image style={styles.icon} source={require('../images/bottom_play.png')}/>
                        <Text style={styles.addAllText}>播放全部</Text>
                        <Text style={styles.numText}>(共{this.parseDataNum()}首)</Text>
                    </View>
                </CustomButton>
                <Text style={styles.separator}/>
            </View>
        );
    }

    render() {
        return (
            <CoordinatorLayout style={{flex: 1}}>
                <FlatList
                    data={this.props.subsData}
                    renderItem={({item, index}) => <Item song={item} index={index} onPress={(song) => {
                        if (this.props.onPushSong) {
                            this.props.onPushSong(song);
                        }
                        this.props.onNavPlayPage();
                    }}/>}
                    keyExtractor={(item, index) => item.id}
                    ItemSeparatorComponent={() => <Text style={styles.separator}/>}
                    ListHeaderComponent={this.renderHeader.bind(this)}/>
                <PlayerUIBottom onPress={this.props.onNavPlayPage}/>
            </CoordinatorLayout>
        );
    }
}

const styles = StyleSheet.create({
    separator : {
        height: 0.5,
        marginLeft: 50,
        backgroundColor: GlobalStyles.text_dark_hint,
    },
    addAllContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        paddingVertical: 6
    },
    addAllContainerNone: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e1e1e1',
        paddingVertical: 6
    },
    intro: {
        color: GlobalStyles.text_dark_primary
    },
    icon: {
        height: 30,
        width: 30,
        marginHorizontal: 12
    },
    addAllText: {
        color: GlobalStyles.text_dark_primary,
        fontSize: 18
    },
    numText: {
        color: GlobalStyles.text_dark_hint,
        fontSize: 16
    },
    title: {
        alignSelf: 'flex-start',
        margin: 10,
    }
});

const mapDispatchToProps = (dispatch) => {
    return {
        onPushSong: (song) => {
            dispatch({type: 'POINT_SONG', song: song});
        },
        onAddSongs: (songs) => {
            dispatch({type: 'ADD_SONGS', song: songs})
        }
    }
};

export default connect(
    null,
    mapDispatchToProps
)(SongList)