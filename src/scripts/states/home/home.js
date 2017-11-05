import bootstrap from 'bootstrap';

import template from 'states/home/home.html';
import /*style from*/ 'states/home/home.scss';

import 'components/post-list/post-list';

bootstrap.config(function ($stateProvider) {
    "ngInject";

    $stateProvider.state({
        name: 'home',
        url: '/',

        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN']
        },

        // resolve: {
        //     users: function (JsonPlaceholder) {
        //         "ngInject";
        //         return JsonPlaceholder.users();
        //     }
        // },

        template: template

        // controller: function ($timeout, $q, Store, JsonPlaceholder) {
        //     "ngInject";
        //
        //     // let store1 = Store.create({x: 0});
        //     //
        //     // store1.subscribe(function (state) {
        //     //     console.log('gotcha1', state);
        //     //
        //     //     state.x = 0;
        //     //     console.log('mutable?', store1.state);
        //     // });
        //     //
        //     // store1.subscribe((state) => {
        //     //     console.log('gotcha2', state);
        //     // });
        //     //
        //     // let increase = function (amount) {
        //     //     return function (state) {
        //     //         return $timeout(function () {
        //     //             return Object.assign({}, state, {
        //     //                 x: state.x + amount
        //     //             });
        //     //         }, 500);
        //     //         // return $q.reject('fuck you!');
        //     //     }
        //     // };
        //     //
        //     // let mutate = function () {
        //     //
        //     //     return function () {
        //     //         return $timeout(function () {
        //     //             return {
        //     //                 y: 12
        //     //             };
        //     //         }, 1500)
        //     //
        //     //     }
        //     // };
        //     //
        //     // store1.dispatch(increase(42));
        //     // store1.dispatch(mutate());
        //     //
        //     // // store1.dispatch();
        //
        //     let storeUsers = Store.create({count: 0});
        //
        //     storeUsers.subscribe(function (users) {
        //         console.log('users', users);
        //     });
        //
        //     let loadUsers = function (state) {
        //         return JsonPlaceholder.users().then(function (users) {
        //             return Object.assign({}, state, {
        //                 users
        //             });
        //         });
        //     };
        //
        //     storeUsers.dispatch(loadUsers);
        //
        //     // storeUsers.execute(JsonPlaceholder.users());
        // }
    });
});
