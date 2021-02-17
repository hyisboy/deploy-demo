/*
 * @Descripttion: 按需引入 element-ui
 * @version: 
 * @Author: david
 * @Date: 2020-07-06 22:05:07
 * @LastEditors: david
 * @LastEditTime: 2020-07-06 23:51:12
 */
import {
    Pagination,
    Dialog,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    TimePicker,
    Popover,
    Tooltip,
    Form,
    FormItem,
    Tag,
    Tree,
    Alert,
    Slider,
    Icon,
    Row,
    Col,
    Upload,
    Progress,
    Card,
    Carousel,
    CarouselItem,
    Collapse,
    CollapseItem,
    Image,
    Backtop,
    PageHeader,
    Loading,
    MessageBox,
    Message,
    Notification
} from 'element-ui';

const components = {
    Pagination,
    Dialog,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    TimePicker,
    Popover,
    Tooltip,
    Form,
    FormItem,
    Tag,
    Tree,
    Alert,
    Slider,
    Icon,
    Row,
    Col,
    Upload,
    Progress,
    Card,
    Carousel,
    CarouselItem,
    Collapse,
    CollapseItem,
    Image,
    Backtop,
    PageHeader,
    //Loading,
    //MessageBox,
    //Message,
    //Notification
}
export const element = {
    install: function (Vue) {
        Object.keys(components).forEach(_key => {
            Vue.use(components[_key]);
        })
        Vue.prototype.$mesage = Message;
        Vue.prototype.$notify = Notification;
        Vue.prototype.$comfirm = MessageBox.confirm;

    }
}