/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/5/7
 * @description:
 */

import realm from '../../util/realm'

export default class Song {

    constructor(item, index) {
        this.index = index;
        this.id = item.sub_id;
        this.title = item.sub_title;
        this.date = item.sub_modified;
        this.cover = parseCoverUrl(item.sub_parent_wiki);

        if (item.sub_upload.length > 0) {
            this.url = item.sub_upload[0].up_url;
            this.quality = item.sub_upload[0].up_quality;
            this.time = item.sub_upload[0].up_data.time;
            this.size = item.sub_upload[0].up_size;
        }

        this.isLoved = realm.queryLovedSong(this.id);
        this.isLocaled = realm.queryLocaledSong(this.id);

        function parseCoverUrl(parent) {
            let temp = parseInt(parent/100);
            let first = parseInt(temp / 1000);
            let second = parseInt(temp / 100 - first * 10);
            let third = parseInt(temp / 10 - first * 100 - second * 10);
            let forth = parseInt(temp - first * 1000 - second * 100 - third * 10);
            let head = '' + first + second + '/' + third + forth;
            let tail = '/000' + first + second + third + forth + parseInt(item.sub_parent_wiki - temp * 100);
            return 'http://moefou.90g.org/wiki_cover/000/' + head + tail + '.jpg';
        }
    }
}