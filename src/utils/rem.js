/*
 * @Author: daiwei
 * @since: 2020-05-30 09:35:40
 * @lastTime: 2020-06-08 15:05:46
 * @LastAuthor: Do not edit
 * @FilePath: /ifiregas_web/src/utils/rem.ts
 * @message:
 */
/**
 * rem配置 : 使用浏览器高度进行配置
 */
export class Rem {
    constructor() {
        this.unit = 100; //单位
        this.widescreen_design_height = 1350; // 宽屏分辨率
        this.normal_design = 1080; // 标准屏分辨率
        this.rootFontSize = 100;
        this.setNormalScreenMode();
    }
    // 设置根节点字体大小
    setRootFontSize(fontSize) {
        document.documentElement.style.fontSize = fontSize + 'px';
    }
    /**
     * 设置为标准模式
     */
    setNormalScreenMode() {
        const BASE_UNIT = document.documentElement.offsetHeight;
        this.rootFontSize = BASE_UNIT / this.normal_design * this.unit;
        this.setRootFontSize(this.rootFontSize);
    }
    /**
    * 将rem转化成px
    * @param {Number} rem 
    */
    toPx(rem) {
        return this.rootFontSize * rem;
    }
}
/**
 * 创建rem对象，并设置根节点配置的像素值
 */
export  function createRem() {
    return new Rem();
}