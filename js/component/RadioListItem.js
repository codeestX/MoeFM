/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/4/27
 * @description:
 */

import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native'
import CustomButton from './CustomButton'

export default class RadioListItem extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CustomButton onPress={() => this.props.onPress(this.props.wiki)}>
                <View style={styles.container}>
                    <Image source={{uri: this.props.wiki.cover, width: 50, height: 50}}/>
                    <View style={{flexDirection: 'column', marginLeft: 20}}>
                        <Text numberOfLines={1}>{this.props.wiki.title}</Text>
                        <Text style={styles.name} numberOfLines={1}>{this.props.wiki.name}</Text>
                    </View>
                </View>
            </CustomButton>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 3,
    },
    name: {
        fontSize: 10,
        color: '#d8d8d8',
    }
});