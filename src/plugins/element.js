import Vue from 'vue'
//按需导入组件
import {Button, Form, FormItem, Input, Message} from 'element-ui'
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.component(Message.name, Message)
//挂载实例
Vue.prototype.$Message = Message

