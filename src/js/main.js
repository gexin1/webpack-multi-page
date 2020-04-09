// 导入
const devMode = process.env.NODE_ENV !== 'production';
// import VConsole from "vconsole";
// new VConsole();
// import 'amfe-flexible';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import EventBus from 'eventbusjs';
import lazyload from '@/libs/lazyload/lazyload.js';

//基础css
import '@/styles/base.scss';
//引入公共模板

NProgress.start();
//初始化语言
$(() => {
  NProgress.done();
  new lazyload($('.lazyload'));
});
