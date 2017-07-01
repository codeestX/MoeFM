/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/6/22
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
import { stopTask } from '../action/download'
import Item from '../component/DownloadListItem'
import GlobalStyle from '../style/global'

class DownloadList extends Component {

    handleDelete(jobId) {
        if (this.props.onDelete()) {
            this.props.onDelete(jobId)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.downloadTasks && nextProps.downloadTasks) {
            return this.props.downloadTasks.length !== nextProps.downloadTasks.length
        } else {
            return true;
        }
    }

    render() {
        return (
            <View style={{backgroundColor: 'white', height: GlobalStyle.window_height - 50}}>
                <FlatList
                    data={this.props.downloadTasks}
                    renderItem={({item, index}) => <Item task={item} onDelete={this.handleDelete}
                    />}
                    ItemSeparatorComponent={() => <Text style={styles.separator}/>}
                    keyExtractor={(item, index) => index}
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
        downloadTasks: state.downloads.downloadTasks,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (jobId) => {
            dispatch(stopTask(jobId))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DownloadList)