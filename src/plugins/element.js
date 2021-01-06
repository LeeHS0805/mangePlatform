import Vue from 'vue'
//按需导入组件
import {
    Aside,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    ButtonGroup,
    Card,
    Col,
    Container, Dialog,
    Form,
    FormItem,
    Header,
    Input,
    Main,
    Menu,
    MenuItem,
    MenuItemGroup,
    Message,
    Option,
    Pagination,
    Row,
    Select,
    Submenu,
    Switch,
    Table,
    TableColumn,
    Tooltip,
    MessageBox
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(ButtonGroup)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)


Vue.component(Message.name, Message)
//挂载实例
Vue.prototype.$Message = Message
Vue.prototype.$MessageBox=MessageBox

