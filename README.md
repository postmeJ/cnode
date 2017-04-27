# Cnode

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-rc.2.

A cnode community developed using the `Angular2` + `TypeScript` + `Rxjs` technology

## Preview

https://riyueweiyi.github.io/cnode-pro

## Project structure

+---app                         // 工程目录
|   +---core                    // 核心服务（路由控制，用户验证，消息服务）
|   +---domain                  // 模型，常量
|   +---login                   // 登录模块（路由，module， 组件，样式）
|   +---message                 // 消息模块
|   |   \---msg-item
|   +---profile                 // 个人主页
|   +---shared                  // 全局模块（组件，过滤器）
|   |   +---components          // components
|   |   |   +---header
|   |   |   \---select
|   |   \---pice                // pice
|   \---topics                  // 主题模块
|       +---detail              // 主题详情
|       +---publish-topic       // 发布主题
|       +---reply               // 主题评论
|       |   \---reply-item
|       \---topic
+---assets                      // 公共资源              
\---environments


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
