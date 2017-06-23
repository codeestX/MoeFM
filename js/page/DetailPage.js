/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/5/7
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
import Song from '../model/bean/Song'
import Item from '../component/SongItem'
import GlobalStyles from  '../style/global'
import Api from '../model/api/Api'
import {
    CoordinatorLayout,
} from 'react-native-bottom-sheet-behavior'
import CustomButton from '../component/CustomButton'
import PlayerUIBottom from '../container/PlayerUIBottom'

class DetailPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subsData: [],
            refreshing: false,
        };
    }

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.wiki.title}`,
    });

    parseDataNum() {
        return this.state.subsData.filter((it) => it.url !== undefined).length
    }

    handleAddAll() {
        if (this.props.onAddSongs) {
            this.props.onAddSongs(this.state.subsData);
        }
    }

    renderHeader() {
        const { params } = this.props.navigation.state;
        return (
            <View>
                <View style={{justifyContent: 'flex-end'}}>
                    <Image style={{alignSelf: 'stretch'}} source={{uri: params.wiki.cover, height: 240}}/>
                    <Text style={styles.title} numberOfLines={1}>{params.wiki.title}</Text>
                </View>
                {params.wiki.intro !== undefined && <Text style={ styles.intro}>{params.wiki.intro}</Text>}
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
        const { navigate } = this.props.navigation;
        return (
            <CoordinatorLayout style={{flex: 1}}>
                <FlatList
                    data={this.state.subsData}
                    renderItem={({item, index}) => <Item song={item} index={index} onPress={(song) => {
                        if (this.props.onPushSong) {
                            this.props.onPushSong(song);
                        }
                        navigate('Player');
                    }}/>}
                    keyExtractor={(item, index) => item.id}
                    ItemSeparatorComponent={() => <Text style={styles.separator}/>}
                    ListHeaderComponent={this.renderHeader.bind(this)}/>
                <PlayerUIBottom onPress={() => navigate('Player')}/>
            </CoordinatorLayout>
        );
    }

    componentDidMount() {
        // this.fetchInfoData();
        const { params } = this.props.navigation.state;
        this.fetchSubsData(params.type, params.wiki.id);
    }

    async fetchSubsData(type, id) {
        this.setState({refreshing: true});
        let result = await Api.getSubsData(type, id);
        let songData = [];
        if (type === 'music') {
            //music
            let songs = result.response.subs;
            if (songs === null || songs.length === 0)
                return;
            for (let i = 0, len = songs.length; i < len; i++) {
                songData.push(new Song(songs[i]));
            }
        } else {
            //radio
            let songs = result.response.relationships;
            if (songs === null || songs.length === 0)
                return;
            for (let i = 0, len = songs.length; i < len; i++) {
                songData.push(new Song(songs[i].obj));
            }
        }
        this.setState({subsData: songData, refreshing: false});
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
)(DetailPage)