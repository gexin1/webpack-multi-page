// 导入
// import VConsole from "vconsole";
// new VConsole();
// import 'amfe-flexible';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// import EventBus from 'eventbusjs';
import Lazyload from '@/libs/lazyload/lazyload.js';

// 基础css
import '@/styles/base.scss';
// const devMode = process.env.NODE_ENV !== 'production';
// 引入公共模板

NProgress.start();
// 初始化语言
$(() => {
    NProgress.done();
    new Lazyload($('.lazyload'));
});
