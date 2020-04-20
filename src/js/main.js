/* eslint-disable */
// Does not work with `new funcA.bind(thisArg, args)`

// 在入口引入不支持的方法
// import 'core-js/stable/function/bind';

// import NProgress from 'nprogress';
// import 'nprogress/nprogress.css';

// import Lazyload from '@/libs/lazyload/lazyload.js';

// // 基础css
// import '@/styles/base.scss';
// const devMode = process.env.NODE_ENV !== 'production';
// 引入公共模板

// NProgress.start();
// 初始化语言
$(() => {
    // NProgress.done();
    // new Lazyload($('.lazyload'));
    console.log.bind(console, 42)(43); // => 42 43
});
