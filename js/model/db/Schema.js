/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/6/5
 * @description:
 */

import Realm from 'realm';

class LovedSong extends Realm.Object {}
class LocalSong extends Realm.Object {}

LovedSong.schema = {
    name:'LovedSong',
    primaryKey: 'id',
    properties: {
        index: {type: 'int'},
        id: {type: 'int'},
        title: {type: 'string'},
        date: {type: 'int'},
        cover: {type: 'string'},
        url: {type: 'string', optional: true},
        quality: {type: 'string', optional: true},
        time: {type: 'string', optional: true},
        size: {type: 'int', optional: true},
        isLoved: {type: 'bool'},
        isLocaled: {type: 'bool'},
    }
};

LocalSong.schema = {
    name:'LocalSong',
    primaryKey: 'id',
    properties: {
        index: {type: 'int'},
        id: {type: 'int'},
        title: {type: 'string'},
        date: {type: 'int'},
        cover: {type: 'string'},
        url: {type: 'string', optional: true},
        quality: {type: 'string', optional: true},
        time: {type: 'string', optional: true},
        size: {type: 'int', optional: true},
        isLoved: {type: 'bool'},
        isLocaled: {type: 'bool'},
    }
};

export default new Realm({schema: [LovedSong, LocalSong]})