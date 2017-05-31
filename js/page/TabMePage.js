/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/4/18
 * @description:
 */

import React, {Component} from 'react'
import {
    Text,
} from 'react-native'
import { List, ListItem } from 'react-native-elements'

const list = [{
        title: '我的收藏',
        icon: 'star',
        nav: 'PlayList'
    }, {
        title: '播放历史',
        icon: 'history',
        nav: 'PlayList'
    }, {
        title: '本地音乐',
        icon: 'file-music',
        nav: 'PlayList'
    }, {
        title: '设置',
        icon: 'settings',
        nav: 'Settings'
    }
];

export default class TabMePage extends Component {

    render() {
        const { navigate } = this.props.navigation;
        return (
            <List>
                {
                    list.map((item, i) => (
                        <ListItem
                            key={i}
                            title={item.title}
                            leftIcon={{name: item.icon}}
                            onPress={() => navigate(item.nav)}
                        />
                    ))
                }
            </List>
        );

    }
}