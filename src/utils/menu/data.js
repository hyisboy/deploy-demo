export const MenuList = [
    { title: '首页大屏', path: '/main', active: true },
    { title: '监控中心', path: '/monitor', active: false, },
    {
        title: '系统管理', path: '/system', active: false,
        children: [
            { title: '行政机构管理', path: '/system/orgs', active: false },
            { title: '用户管理', path: '/system/users', active: false },
            { title: '角色管理', path: '/system/roles', active: false },
        ]
    },
    { title: '项目管理', path: '/projects', active: false, },
    {
        title: '设备管理', path: '/device', active: false,
        children: [
            { title: '感应器', path: '/device/sensors', active: false },
            { title: '摄像头', path: '/device/cameras', active: false },
            { title: 'Rfid', path: '/device/Rfid', active: false },
        ]
    },
    { title: '报警隐患', path: '/alarmdanger', active: false,
        children: [
            { title: '报警列表', path: '/alarmdanger/list', active: false },
            { title: '事件列表', path: '/alarmdanger/event-list', active: false },
            { title: '历史报警列表', path: '/alarmdanger/his-list', active: false },
        ] },
    { title: '数据分析', path: '/data', active: false, },
];
/**
 * 查找当前导航的路由位置
 * @param path 当前路由的 path
 * @param menuList 数据源，默认为当前文件的 @MenuList 属性
 */
export function findMenuIndex(path, menuList) {
    const _menuList = menuList || MenuList;
    const result = { parentIndex: 0, childIndex: null };
    //开始寻找
    _menuList.forEach((_item, _index) => {
        if (_item.children) {
            _item.children.forEach((_childMenu, _childIndex) => {
                if (_childMenu.path === path) {
                    result.childIndex = _childIndex;
                    result.parentIndex = _index;
                }
            });
        }
        else if (_item.path === path) {
            result.parentIndex = _index;
        }
    });
    return result;
}
//# sourceMappingURL=data.js.map