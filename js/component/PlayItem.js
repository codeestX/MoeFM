/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/6/7
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

export default class PlayItem extends React.PureComponent {

    static defaultProps = {
        isSelected: false,
    };

    render() {
        return (
            <CustomButton onPress={() => this.props.onPress(this.props.song)}>
                <View style={styles.container}>
                    {this.props.isSelected && <Image style={styles.icon} source={require('../images/ic_volumn.png')}/>}
                    <Text style={{color: this.props.isSelected? 'red': 'black', flex: 1, marginHorizontal: 3}} numberOfLines={1}>{this.props.song.title}</Text>
                    <CustomButton onPress={() => this.props.onDelete(this.props.index)}>
                        <Image style={styles.icon} source={require('../images/ic_close.png')}/>
                    </CustomButton>
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
        padding: 15,
    },
    icon: {
        width: 20,
        height: 20,
        marginHorizontal: 5
    },
});