/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/6/22
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
import DownloadProgress from '../container/DownloadProgress'

export default class DownloadListItem extends React.PureComponent {

    static defaultProps = {
        isSelected: false,
    };

    render() {
        return (
            <CustomButton onPress={() => this.props.onPress(this.props.task.song)}>
                <View style={styles.container}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text style={{marginHorizontal: 3}} numberOfLines={1}>{this.props.task.song.title}</Text>
                        <DownloadProgress jobId={this.props.task.jobId}/>
                    </View>
                    <CustomButton onPress={() => this.props.onDelete(this.props.task.jobId)}>
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
        paddingVertical: 5,
        paddingHorizontal: 12
    },
    icon: {
        width: 20,
        height: 20,
    },
});