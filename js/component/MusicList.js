/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/4/27
 * @description:
 */

import React, {Component} from 'react'
import {
    FlatList,
} from 'react-native'
import Item from './MusicListItem'
import Wiki from  '../model/bean/Wiki'
import Api from '../model/api/Api'

export default class MusicList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            refreshing: false
        };
    }

    render() {
        return (
            <FlatList
                data={this.state.data}
                renderItem={({item}) => <Item wiki={item} onPress={this.props.onPress}/>}
                keyExtractor={(item, index) => item.id}
                onRefresh={() => this.fetchMusicData()}
                refreshing={this.state.refreshing}
                numColumns={2}
            />
        );
    }

    componentDidMount() {
        this.fetchMusicData();
    }

    async fetchMusicData() {
        this.setState({refreshing: true});
        let result = await Api.getMusicData();
        let hotItems = result.response.hot_musics;
        let newItems = result.response.musics;

        let wikis = hotItems.map((it) => new Wiki(it)).concat(newItems.map((it) => new Wiki(it)));

        this.setState({data: wikis, refreshing: false});
    }
}

