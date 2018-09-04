import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import "babel-polyfill";
import moment from 'moment';
import Globe from './components/common/Globe';
import './assets/iconfont/iconfont.css';
import directives from './components/directives';
import filters from './components/filters';
Vue.use(ElementUI, { size: 'small' });
Vue.prototype.moment = moment;
Vue.prototype.globe = Globe;

//全局定义验证规则
Vue.prototype.phoneRule=(rule,value,callback)=>{
    const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
    if (!value){
        callback(new Error('此字段为必填'))
    }else if (!reg.test(value)){
        callback(new Error('请输入正确的11位数字的手机号码'))
    }else {
        callback()
    }
};

Vue.prototype.digitRule=(rule,value,callback)=>{
    if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
    } else {
        callback()
    }
};

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
