import 'services/store/StoreLogger';
import 'services/store/StorePersistent';

import 'app.scss';
import 'states/home/home';

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
    @Inject('StoreLogger', 'StorePersistent', 'JsonStore')
    static ApplicationRun(StoreLogger, StorePersistent, JsonStore) {
        if (CONFIG.dev) {
            StoreLogger.log('JsonStore', JsonStore);
        }

        StorePersistent.store('JsonStore', JsonStore);
    }
}

export default Application;
