# Cnode

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-rc.2.

A cnode community developed using the `Angular2` + `TypeScript` + `Rxjs` technology

## Preview

https://riyueweiyi.github.io/cnode-pro

## What's included

Within the project you'll find the following directories and files, You'll see something like this:

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
