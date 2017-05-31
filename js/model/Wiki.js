/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/5/5
 * @description:
 */

export default class Wiki{
    constructor(item) {
        this.id = item.wiki_id;
        this.name = item.wiki_name;
        this.title = item.wiki_title;
        this.date = item.wiki_modified;
        this.cover = item.wiki_cover.square;
        this.fav = item.fav_count? item.fav_count: 0;
        this.intro = item.wiki_meta? this.parseIntro(item.wiki_meta): undefined;
    }

    parseIntro(metas) {
        let introItem = metas.filter((it) => it.meta_type === 2);
        return introItem.length > 0? introItem[0].meta_value: undefined;
    }
}