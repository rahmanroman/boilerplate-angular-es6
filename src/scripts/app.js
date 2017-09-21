import bootstrap from 'bootstrap';

import 'app.scss';

bootstrap
    .config(function ($locationProvider,
                      $compileProvider,
                      $httpProvider,
                      $qProvider,
                      $localStorageProvider,
                      $urlRouterProvider) {
        "ngInject";

        $locationProvider.html5Mode(true);

        $compileProvider.debugInfoEnabled(CONFIG.dev);

        $httpProvider.useApplyAsync(true);

        $qProvider.errorOnUnhandledRejections(false);

        $localStorageProvider.setKeyPrefix('ls.');

        $urlRouterProvider.otherwise('/');
    })

    .run(function () {
        "ngInject";
    });

import 'states/home/home';

