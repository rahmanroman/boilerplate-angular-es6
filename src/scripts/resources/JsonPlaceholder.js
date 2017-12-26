import 'services/http/TransformResponse'

import { Inject, Service } from "bootstrap";

@Service({
    name: 'JsonPlaceholderResource'
})
@Inject('$resource', 'TransformResponse')
class JsonPlaceholderResource {
    constructor($resource, TransformResponse) {
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

export default JsonPlaceholderResource;
