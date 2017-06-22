/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/6/5
 * @description:
 */

import realm from '../model/db/Schema';

export default class Realm {

    static insertLovedSong(song) {
        console.log(song);
        realm.write(()=>{
            realm.create('LovedSong',{
                id: song.id,
                title: song.title,
                date: song.date,
                cover: song.cover,
                url: song.url,
                quality: song.quality,
                time: song.time,
                size: song.size,
                isLoved: song.isLoved,
                isLocaled: song.isLocaled
            });
        });
    }

    static deleteLovedSong(id) {
        realm.write(() => {
            // let target = realm.create('LovedSong', {id: id});
            const target = realm.objects('LovedSong').filtered('id = ' + id);
            realm.delete(target);
        });
    }

    static queryLovedSong(id) {
        const target = realm.objects('LovedSong').filtered('id = ' + id);
        return target !== null && target.length > 0;
    }

    static insertLocaledSong(song) {
        realm.write(()=>{
            realm.create('LocalSong',{
                id: song.id,
                title: song.title,
                date: song.date,
                cover: song.cover,
                url: song.url,
                quality: song.quality,
                time: song.time,
                size: song.size,
                isLoved: song.isLoved,
                isLocaled: song.isLocaled
            });
        });
    }

    static deleteLocaledSong(id) {
        const target = realm.objects('LocalSong').filtered('id = ' + id);
        realm.delete(target);
    }

    static queryLocaledSong(id) {
        const target = realm.objects('LocalSong').filtered('id = ' + id);
        return target !== null && target.length > 0;
    }
}