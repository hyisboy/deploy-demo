/*
 * @Descripttion: 将一组数据分成若干份，根据传入的时间进行切换
 * @version: 
 * @Author: david
 * @Date: 2020-07-06 19:54:29
 * @LastEditors: david
 * @LastEditTime: 2020-07-06 20:05:02
 */ 
export default class TimeToList {
    /**
     * @param source 数据源
     * @param selectCallback 选取时的回调
     * @param timer 间隔时间
     */
    constructor(source, count, selectCallback, timer) {
        this.source = []; //数据源
        this.timer = 10000; // 默认间隔10秒
        this.count = 0; // 选取的个数
        this.selectList = [];
        this.cycle = 0; //周期数
        this.currentCycleIndex = 0; // 当前进行的周期位置
        this.timerId = null; //定时ID
        this.source = source;
        this.count = count;
        this.selectCallback = selectCallback;
        if (timer != undefined) {
            this.timer = timer;
        }
        this.start();
    }
    /**
     * 1.开始根据时间进行循环， 如果@count 数量大于本身 ，则 复位为最大数据源长度
     * 2.周期次数小于等于 1的时候 ，不进行循环
     */
    start() {
        if (this.source.length < this.count) {
            this.count = this.source.length;
        }
        // 周期数
        this.cycle = this.source.length % this.count === 0 ? this.source.length / this.count : Math.ceil(this.source.length / this.count);
        if (this.cycle > 1) { //周数 大于 1，则开始循环
            this.loop();
        }
        else {
            this.selectCallback(this.source);
        }
    }
    // 开始循环
    loop() {
        if (this.currentCycleIndex >= this.cycle) { // 复位
            this.currentCycleIndex = 0;
        }
        this.selectList = this.source.slice(this.currentCycleIndex * this.count, (this.currentCycleIndex + 1) * this.count);
        this.currentCycleIndex++;
        this.selectCallback(this.selectList);
        this.timerId = setTimeout(() => {
            this.loop();
        }, this.timer);
    }
    /**
     * 清除循环配置
     */
    clearLoop() {
        this.selectList = [];
        if (this.timerId) {
            clearTimeout(this.timerId);
        }
    }
    /**
     * 修改数据
     * @param data
     */
    changeData(data) {
        this.clearLoop();
        this.source = data;
        this.start();
    }
    getSelectList() {
        return this.selectList;
    }
    getSource() {
        return this.source;
    }
    /**
     * 销毁
     */
    destroy() {
        this.clearLoop();
        this.source = [];
        this.selectList = [];
    }
}