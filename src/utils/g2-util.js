import { Chart, registerShape, registerTheme } from "@antv/g2";
import DataSet from '@antv/data-set';
import { createThemeByStylesheet } from '@antv/g2/lib/util/theme';
function initConfig() {
    // 通过 getThemeByStylesheet 方法将样式属性值填充到主题结构中
    const darkTheme = createThemeByStylesheet({
        axisLineBorder: 0.5,
        pointFillColor: '#000',
    });
    // 基于默认的主题结构，应用 dark 主题样式表定义全新的暗黑色系主题
    registerTheme('dark', darkTheme); // 
}
export function setGrid(chart) {
}
/**
   * 获取数据中最大值
   */
export function getMax(data, field, field2) {
    let max = 0;
    let max_2 = 0;
    data.forEach(item => {
        if (item[field] && item[field] > max) {
            max = item[field];
        }
    });
    if (field2) {
        data.forEach(item => {
            if (item[field2] && item[field2] > max_2) {
                max_2 = item[field2];
            }
        });
    }
    max = max > max_2 ? max : max_2;
    if (max % 10 !== 0) {
        max = Math.ceil(max / 10) * 10;
    }
    return max;
}
/**
 *  设置图表坐标配置
 * @param chart
 * @param axisType 坐标类型
 * @param field  设置的字段
 */
export function setAxisConf(chart, field, isGrid, formatter, axisType) {
    chart.axis(field, {
        tickLine: null, subTickLine: {
            style: {
                fill: '#fff'
            }
        },
        grid: isGrid ? {
            line: {
                style: {
                    fill: 'red',
                    stroke: '#fff',
                    strokeOpacity: .3
                }
            }
        } : null,
        label: {
            formatter(text) {
                if (typeof formatter === 'function') {
                    return formatter(text);
                }
                return text;
            },
            style: {
                fill: '#fff'
            }
        },
    });
}
/**
 * 设置图表的标题，位于顶部
 * @param chart
 * @param title
 * @param direction
 */
export function setChartTitle(chart, title, direction, position, fontSize) {
    let positionArr = {
        'bottom-right': ['92%', '114%'],
        'top-left': ['-7%', '-4%'],
    };
    let _position = [];
    if (direction) {
        _position = positionArr[direction];
    }
    else {
        _position = positionArr['top-left'];
    }
    if (position) {
        _position = position;
    }
    chart
        .annotation()
        .text({
        position: _position,
        content: title,
        style: {
            fontSize: 12,
            stroke: '',
            fill: '#fff'
        },
        offsetY: 0,
    });
}
/**
 * 设置透明的图表背景（dark主题下 背景是黑色的）
 */
export function setBaseChartBg(chart) {
    chart.ele.firstChild.style.backgroundColor = "transparent";
}
/**
 * 创建图表实例
 * @param container
 */
export function g2ChartFactory(container) {
    const chart = new Chart({
        container: container,
        autoFit: true,
        theme: 'dark'
    });
    setBaseChartBg(chart);
    return chart;
}
// 注册圆角形状
function registerRadius() {
    registerShape('interval', 'border-radius', {
        draw(cfg, container) {
            const points = cfg.points;
            let path = [];
            path.push(['M', points[0].x, points[0].y]);
            path.push(['L', points[1].x, points[1].y]);
            path.push(['L', points[2].x, points[2].y]);
            path.push(['L', points[3].x, points[3].y]);
            path.push('Z');
            path = this.parsePath(path); // 将 0 - 1 转化为画布坐标
            const group = container.addGroup();
            group.addShape('rect', {
                attrs: {
                    x: path[1][1],
                    y: path[1][2],
                    width: path[2][1] - path[1][1],
                    height: path[0][2] - path[1][2],
                    fill: cfg.color,
                    radius: (path[2][1] - path[1][1]) / 2,
                },
            });
            return group;
        },
    });
}
/**
 * 获取DataView实例
 */
export function dvFactory(data) {
    return new DataSet().createView().source(data);
}
