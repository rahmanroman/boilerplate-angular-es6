import 'services/http/TransformResponse'

class JsonPlaceholder {
    constructor($resource, TransformResponse) {
        "ngInject";

        this.resource = $resource('jsonplaceholder/api/:service/:id', {}, {
            'post_list': {
                method: 'GET',
                isArray: true,
                params: {
                    service: 'posts'
                },

                transformResponse: [
                    TransformResponse.expectArray()
                ]
            },

            'user_list': {
                method: 'GET',
                isArray: true,
                params: {
                    service: 'users'
                },

                transformResponse: [
                    TransformResponse.expectArray()
                ]
            }
        });
    }

    posts() {
        return this.resource.post_list().$promise;
    }

    users() {
        return this.resource.user_list().$promise;
    }
}

import bootstrap from 'bootstrap';

bootstrap.service('JsonPlaceholder', JsonPlaceholder);
