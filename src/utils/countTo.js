
/*
 * @Author: daiwei
 * @since: 2020-06-08 11:34:35
 * @lastTime: 2020-06-08 13:34:20
 * @LastAuthor: Do not edit
 * @FilePath: /ifiregas_web/src/utils/countTo.ts
 * @message: 统计列表数据存储
 */

export class CountTo {
    constructor(list, obj) {
        this.countToList = [];
        if (list && obj) {
            this.init(list, obj);
        }
    }
    init(list, obj) {
        this.countToList = list.map(_item => {
            _item.endVal = obj[_item.field] || 0;
            _item.startVal = 0;
            return _item;
        });
    }
    setStart(obj, list) {
        if (list) {
            this.init(list, obj);
        }
        else {
            this.countToList.forEach(_item => {
                _item.startVal = _item.endVal;
                _item.endVal = obj[_item.field];
            });
        }
    }
    /**
     * 获取当前变化的total值
     * @param obj
     */
    getCurrentCountToList(obj, list) {
        if (obj) {
            this.setStart(obj, list);
        }
        return this.countToList;
    }
}
//# sourceMappingURL=countTo.js.map