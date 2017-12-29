# Angular ES6 boilerplate

Yet another application boilerplate based on NodeJs and Angular 1.x

## Use

### Development

```
gulp serve [--port=3400] [--environment=development]
```

### Production

```
node index [--port=8080] [--environment=production]
```

## Features

Ready-to-use backend+frontend application boilerplate

### Backend

Use `connect` as a server with middleware in production mode and `browserSync` in development

Use `http-proxy-middleware` to proxy APIs:

```
proxy: {
    'https://jsonplaceholder.typicode.com': {
        pathRewrite: {
            '^/jsonplaceholder/api/': '/'
        },

        routes: [
            '/jsonplaceholder/api'
        ],

        headers: {
            'Authorization': 'Bearer 1234567890ABCDEF'
        }
    }
}
```

Use separate configuration based on `NODE_ENV` or `--environment` cli argument. Supports `development` and `production`.

### Frontend

Use `AngularJs 1.x` + `Angular UI-Router`

Use `SCSS`

Use `gulp` + `webpack` in build process

```
import { Component, Inject } from 'bootstrap';

@Component({
    selector: 'postList',
    templateUrl: 'components/post-list/post-list.html',
    styleUrl: 'components/post-list/post-list.scss'
})
@Inject('JsonStore')
class PostListComponent {
    constructor(JsonStore) {
        this.JsonStore = JsonStore;
        this.JsonStore.load();
    }
}
```

## To do

1. Frontend features
    - Babel `stage-0` switch on (async/await etc.)
    - Assets 
        - [+] https://github.com/tcoopman/image-webpack-loader
        - https://github.com/jantimon/iconfont-webpack-plugin, https://github.com/artofrawr/webpack-iconfont-plugin
    - PWA
        - https://github.com/jantimon/favicons-webpack-plugin
        - https://www.npmjs.com/package/sw-precache-webpack-plugin
    - [?] Css in Js
        - https://github.com/castillo-io/angular-css
1. Backend features
    - [+] https://www.npmjs.com/package/helmet
1. Vendors
    - Angular-translate
    - Angular UI-Router https://github.com/ui-router/sample-app-angularjs https://plnkr.co/edit/2SSO4Y?p=preview
    - [?] Redux for Angular https://github.com/angular-redux/ng-redux/, https://github.com/jaystack/repatch
1. Build optimization
    - [?] https://webpack.js.org/plugins/module-concatenation-plugin/
1. Review boilerplate:
    - https://github.com/AngularClass/NG6-starter
    - https://github.com/tomastrajan/angular-js-es6-testing-example

