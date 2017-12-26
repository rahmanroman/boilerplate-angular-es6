import angular from 'angular';

import angularAnimate from 'angular-animate';
import angularResource from 'angular-resource';
import angularSanitize from 'angular-sanitize';
import angularUiRouter from 'angular-ui-router';

import 'ngstorage';

let bootstrap = angular.module(CONFIG.angular.module, [
    angularAnimate,
    angularResource,
    angularSanitize,

    angularUiRouter,

    'ngStorage'
]);

export default bootstrap;

//  INFO: http://martinmicunda.com/2015/07/13/how-to-use-ES2016-decorators-to-avoid-angular-1x-boilerplate-code/

const _request = require.context('./', true, /^\.\/.*\.(html|css|scss)/);

export function Inject(...dependencies) {
    return (target, key, descriptor) => {
        // if it's true then we injecting dependencies into function and not Class constructor
        if (descriptor) {
            const fn = descriptor.value;
            fn.$inject = dependencies;
        } else {
            target.$inject = dependencies;
        }
    };
}

export function Config() {
    return (target, key, descriptor) => {
        bootstrap.config(descriptor.value);
    };
}

export function Run() {
    return (target, key, descriptor) => {
        bootstrap.run(descriptor.value);
    };
}

export function Service(options) {
    return (target) => {
        if (!options.name) {
            throw new Error('@Service() must contains name property!');
        }

        bootstrap.service(options.name, target);
    };
}

export function Component(options) {
    return (target) => {
        if (!options.selector) {
            throw new Error('@Component() must contains selector property!');
        }

        let template = _request(`./${options.templateUrl}`);
        _request(`./${options.styleUrl}`);

        delete options.templateUrl;
        options.template = template;

        options.controllerAs = options.controllerAs || '$ctrl';
        options.controller = target;

        bootstrap.component(options.selector, options);

        return target;
    }
}

export function Route(options) {
    return (target) => {
        let template = _request(`./${options.templateUrl}`);
        _request(`./${options.styleUrl}`);

        delete options.templateUrl;
        options.template = template;

        options.controllerAs = options.controllerAs || '$ctrl';
        options.controller = target;

        bootstrap.config(['$stateProvider', ($stateProvider) => {
            $stateProvider.state(options);
        }]);

        return target;
    }
}
