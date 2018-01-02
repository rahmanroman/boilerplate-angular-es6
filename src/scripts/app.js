import 'services/store/StoreLogger';
import 'services/store/StorePersistent';

import 'app.scss';

import 'states/home/home';
import 'states/login/login';

import 'stores/Auth/AuthStore';
import 'stores/Auth/RouteChangeInterceptor';
import 'stores/Auth/HttpRequestInterceptor';

import 'stores/Account/AccountStore';


import { Inject, Config, Run } from "bootstrap";

class Application {
    @Config()
    @Inject(
        '$locationProvider',
        '$compileProvider',
        '$httpProvider',
        '$qProvider',
        '$localStorageProvider',
        '$urlRouterProvider')
    static ApplicationConfig($locationProvider,
                             $compileProvider,
                             $httpProvider,
                             $qProvider,
                             $localStorageProvider,
                             $urlRouterProvider) {
        $locationProvider.html5Mode(true);

        $compileProvider.debugInfoEnabled(CONFIG.dev);

        $httpProvider.useApplyAsync(true);

        $qProvider.errorOnUnhandledRejections(false);

        $localStorageProvider.setKeyPrefix('ls.');

        $urlRouterProvider.otherwise('/');
    }

    @Run()
    @Inject('StoreLogger', 'StorePersistent', 'JsonStore', 'AuthStore', 'AccountStore')
    static ApplicationRun(StoreLogger, StorePersistent, JsonStore, AuthStore, AccountStore) {
        if (CONFIG.dev) {
            // StoreLogger.log('JsonStore', JsonStore);
            StoreLogger.log('AuthStore', AuthStore);
        }

        StorePersistent.store('JsonStore', JsonStore);
        StorePersistent.store('AuthStore', AuthStore);
        StorePersistent.store('AccountStore', AccountStore);
    }
}

export default Application;
