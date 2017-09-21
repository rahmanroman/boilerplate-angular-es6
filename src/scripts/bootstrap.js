import angular from 'angular';

import angularAnimate from 'angular-animate';
import angularResource from 'angular-resource';
import angularSanitize from 'angular-sanitize';
import angularUiRouter from 'angular-ui-router';

import 'ngstorage';

export default angular.module(CONFIG.angular.module, [
    angularAnimate,
    angularResource,
    angularSanitize,

    angularUiRouter,

    'ngStorage'
]);
