/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/5/14
 * @description:
 */

import showToast from '../util/toast';

const API_KEY = 'b3254bb3f2b76457a10e144bc6be7c8a058f22631';

const BASE_URL = 'http://moe.fm/explore?api=json&api_key=' + API_KEY;
const TYPE_HOT_MUSIC = '&hot_musics=1';
const TYPE_NEW = '&musics=1';
const TYPE_HOT_RADIO = '&hot_radios=1';

const API_URL = 'http://api.moefou.org/wikis.json?api_key=' + API_KEY + '&wiki_type=';
const TYPE_RADIO = 'radio';

const API_RADIO_URL = 'http://api.moefou.org/radio/';
const API_RADIO_SUBS = API_RADIO_URL + 'relationships.json?api_key=' + API_KEY + '&wiki_id=';
const API_MUSIC_URL = 'http://api.moefou.org/music/';
const API_MUSIC_SUBS = API_MUSIC_URL + 'subs.json?api_key=' + API_KEY + '&wiki_id=';


const fetchData = (url) => {
    return fetch(url)
        .then(response => {
            return response.json();
        })
        .then(json => {
            showToast(json.message);
            return json;
        })
        .catch(error => {
            showToast('网络错误');
            console.warn(error);
        });
};

// apis
export default class Api {

    //获取音乐列表数据
    static getMusicData() {
        return fetchData(BASE_URL + TYPE_HOT_MUSIC + TYPE_NEW);
    }

    //获取热门电台数据
    static getHotRadioData() {
        return fetchData(BASE_URL + TYPE_HOT_RADIO);
    }

    //获取电台列表数据
    static getRadioData() {
        return fetchData(API_URL + TYPE_RADIO);
    }

    //获取歌曲列表数据
    static getSubsData(type, id) {
        if (type === 'music') {
            return fetchData(API_MUSIC_SUBS + id);
        } else {
            return fetchData(API_RADIO_SUBS + id);
        }
    }
}