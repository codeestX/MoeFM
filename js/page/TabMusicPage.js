/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/4/18
 * @description:
 */

import React, {Component} from 'react'
import MusicList from '../component/MusicList'

export default class TabMusicPage extends Component {

    render() {
        const { navigate } = this.props.navigation;
        return (
            <MusicList onPress={(wiki) => navigate('Detail', {wiki: wiki, type: 'music'})}/>
        );
    }
}