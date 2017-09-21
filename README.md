# Angular boilerplate

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


### Fronend

Use `AngularJs 1.x` + `Angular UI-Router`

Use `SCSS`

Use `gulp` as build process runner

## To do

1. Redux for Angular https://github.com/angular-redux/ng-redux/, https://github.com/jaystack/repatch
1. Angular-translate
1. Angular UI-Router https://github.com/ui-router/sample-app-angularjs https://plnkr.co/edit/2SSO4Y?p=preview
1. Babel `stage-0` switch on (async/await etc.)
1. Build assets (images, html etc.)
1. Build PWA (favicons, manifest, service worker)
1. Use boilerplate:
    - https://github.com/AngularClass/NG6-starter
    - https://github.com/tomastrajan/angular-js-es6-testing-example
1. Css in Js
    - https://github.com/castillo-io/angular-css
