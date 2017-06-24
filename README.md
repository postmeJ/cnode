# Cnode介绍

项目使用Angular2开发的一个WebApp版的Cnode客户端

主要运用技术栈: [Angular2](https://angular.io/)  [TypeScript](http://www.typescriptlang.org/)  [Rxjs](http://reactivex.io/) 

UI库: [Angular mdl](https://github.com/mseemann/angular2-mdl)

工具: [Angular CLI](https://github.com/angular/angular-cli)

## 预览地址

[Cnode](https://riyueweiyi.github.io/cnode)

## 环境配置

``` bash
# 安装依赖
npm install

因为angular mdl的版本问题，初次运行需要将node_modules/@angular-mdl/popover/popover.scss和node_modules/@angular-mdl/select/select.scss中的@import "../../../node_modules/@angular-mdl/core/scss/variables" 修改为 @import "../../../node_modules/angular2-mdl/scss/mdl/_variables" 方能正确运行

# 运行开发环境
ng serve

打开 http://localhost:4200/ 将看见项目的运行效果

# 生产环境
ng build --prod

构建好的文件将被保存在dist/目录下
```

## 涉及的技术点

* 自定义首屏加载动画
* 页面跳转动态设置页面标题
* 详情页回退到列表记录用户浏览位置并更新局部视图（利用本地存储记录用户浏览信息，后退回来后请求所有数据，在数据量多的情况性能不容乐观）
* 路由懒加载
* `canActivate` `canDeactivate`设置路由守卫
* 响应式表单
* 自定义 `pipe`
* 自定义指令

## angular cli指南

运行 `ng generate component component-name` 创建一个组件. 你也可以运行 `ng generate directive/pipe/service/class/module` 创建 `指令/管道/服务/类/模块`.

更多的使用指南运行 `ng help` 查看或者查看 [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## 目录结构

```

├─ e2e             //End-to-end test code directory
│  ├─ app.e2e-spec.ts
│  ├─ app.po.ts
│  └─ tsconfig.e2e.json
├─ src            //Source code
│  ├─ app         //Application directory
│  │  ├─ core     //Core service module
│  │  │  ├─ auth-guard.service.spec.ts
│  │  │  ├─ auth-guard.service.ts
│  │  │  ├─ auth.service.spec.ts
│  │  │  ├─ auth.service.ts
│  │  │  ├─ core.module.ts
│  │  │  ├─ message.service.spec.ts
│  │  │  ├─ message.service.ts
│  │  │  ├─ user.service.spec.ts
│  │  │  └─ user.service.ts
│  │  ├─ domain  //Model and constant definition
│  │  │  └─ entities.ts
│  │  ├─ login  //Login module
│  │  │  ├─ login.component.css
│  │  │  ├─ login.component.html
│  │  │  ├─ login.component.spec.ts
│  │  │  ├─ login.component.ts
│  │  │  ├─ login.module.ts
│  │  │  └─ login.routing.ts
│  │  ├─ message    //Message Center
│  │  │  ├─ msg-item
│  │  │  │  ├─ msg-item.component.css
│  │  │  │  ├─ msg-item.component.html
│  │  │  │  ├─ msg-item.component.spec.ts
│  │  │  │  └─ msg-item.component.ts
│  │  │  ├─ message.component.css
│  │  │  ├─ message.component.html
│  │  │  ├─ message.component.spec.ts
│  │  │  ├─ message.component.ts
│  │  │  ├─ message.mudule.ts
│  │  │  └─ message.routing.ts
│  │  ├─ profile    //Profile module
│  │  │  ├─ profile.component.css
│  │  │  ├─ profile.component.html
│  │  │  ├─ profile.component.spec.ts
│  │  │  ├─ profile.component.ts
│  │  │  ├─ profile.module.ts
│  │  │  ├─ profile.routing.ts
│  │  │  ├─ profile.service.spec.ts
│  │  │  └─ profile.service.ts
│  │  ├─ shared     //Common component pipe directives
│  │  │  ├─ components
│  │  │  │  ├─ header
│  │  │  │  │  ├─ header.component.css
│  │  │  │  │  ├─ header.component.html
│  │  │  │  │  ├─ header.component.spec.ts
│  │  │  │  │  └─ header.component.ts
│  │  │  │  └─ select
│  │  │  │     ├─ select.component.css
│  │  │  │     ├─ select.component.html
│  │  │  │     ├─ select.component.spec.ts
│  │  │  │     └─ select.component.ts
│  │  │  ├─ directives
│  │  │  │  └─ preview.directive.ts
│  │  │  ├─ pice
│  │  │  │  ├─ from-now.pipe.spec.ts
│  │  │  │  └─ from-now.pipe.ts
│  │  │  └─ shared.module.ts
│  │  ├─ topics     //Topic Module
│  │  │  ├─ detail  //Topic detail
│  │  │  │  ├─ detail.component.css
│  │  │  │  ├─ detail.component.html
│  │  │  │  ├─ detail.component.spec.ts
│  │  │  │  └─ detail.component.ts
│  │  │  ├─ publish-topic   //Release topic
│  │  │  │  ├─ publish-topic.component.css
│  │  │  │  ├─ publish-topic.component.html
│  │  │  │  ├─ publish-topic.component.spec.ts
│  │  │  │  └─ publish-topic.component.ts
│  │  │  ├─ reply   //Topic reply
│  │  │  │  ├─ reply-item
│  │  │  │  │  ├─ reply-item.component.css
│  │  │  │  │  ├─ reply-item.component.html
│  │  │  │  │  ├─ reply-item.component.spec.ts
│  │  │  │  │  └─ reply-item.component.ts
│  │  │  │  ├─ reply.component.css
│  │  │  │  ├─ reply.component.html
│  │  │  │  ├─ reply.component.spec.ts
│  │  │  │  ├─ reply.component.ts
│  │  │  │  ├─ reply.service.spec.ts
│  │  │  │  └─ reply.service.ts
│  │  │  ├─ topic
│  │  │  │  ├─ filter-category.pipe.spec.ts
│  │  │  │  ├─ filter-category.pipe.ts
│  │  │  │  ├─ topic.component.css
│  │  │  │  ├─ topic.component.html
│  │  │  │  ├─ topic.component.spec.ts
│  │  │  │  └─ topic.component.ts
│  │  │  ├─ topics.component.css
│  │  │  ├─ topics.component.html
│  │  │  ├─ topics.component.spec.ts
│  │  │  ├─ topics.component.ts
│  │  │  ├─ topics.module.ts
│  │  │  ├─ topics.routing.ts
│  │  │  ├─ topics.service.spec.ts
│  │  │  └─ topics.service.ts
│  │  ├─ app.component.css      //The style file for the boot component
│  │  ├─ app.component.html     //The HTML template of the boot component
│  │  ├─ app.component.spec.ts  //Boot component test file
│  │  ├─ app.component.ts   //System boot component
│  │  ├─ app.module.ts      //Apply the root module
│  │  └─ app.routing.ts     //Root routing module
│  ├─ assets                //Site resource folder
│  │  └─ .gitkeep
│  ├─ environments
│  │  ├─ environment.prod.ts //Production environment configuration file
│  │  └─ environment.ts     //Environment configuration
│  ├─ favicon.ico           //Site collection icon
│  ├─ index.html            //Entry page
│  ├─ main.ts               //Entry ts file
│  ├─ polyfills.ts          //For the browser ability to enhance the polyfills reference file
│  ├─ styles.scss           //Global style file
│  ├─ test.ts               //Test the entry file
│  ├─ tsconfig.app.json
│  ├─ tsconfig.spec.json
│  └─ typings.d.ts          //The TypeScript type used in the project defines the reference file
├─ .angular-cli.json        //Angular Command line configuration
├─ .editorconfig            //Editor configuration
├─ .gitignore               //GitHub configuration
├─ README.md
├─ karma.conf.js            //Karma unit test configuration file
├─ package.json             //Package file
├─ protractor.conf.js       //End-to-end test profile (integration test)
├─ tsconfig.json            //TypeScript configuration file
├─ tslint.json              //Code Lint Static check configuration
└─ yarn.lock

```

##最后

感谢 [cnode](https://cnodejs.org/) 提供的api

感谢 [Michael Seemann](https://github.com/mseemann/angular2-mdl) 开发的UI库

界面参考 [lumia2046](https://github.com/lumia2046/cnode) 万分感谢

项目目前还在优化重构中，如果有什么更好的意见或建议欢迎大家和我联系

* 邮件(798057081@qq.com)
* QQ: 798057081
