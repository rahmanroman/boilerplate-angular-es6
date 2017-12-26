import 'services/store/StoreLogger';

import 'states/home/home';

import 'app.scss';

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
    @Inject('StoreLogger', 'JsonStore')
    static ApplicationRun(StoreLogger, JsonStore) {
        if (CONFIG.dev) {
            StoreLogger.log('JsonStore', JsonStore);
        }
    }
}

export default Application;
