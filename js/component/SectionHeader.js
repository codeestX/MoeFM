/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/5/3
 * @description:
 */

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
} from 'react-native'
import { ThemeFlags } from '../style/theme';

export default class MusicListItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.mark}/>
            <Text style={{fontSize: 17}} >{this.props.title}</Text>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
        alignItems: 'stretch'
    },
    mark: {
        backgroundColor: ThemeFlags.Default,
        width: 3,
        marginLeft: 3,
        marginRight: 3,
    }
});