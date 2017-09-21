import angular from 'angular';

class TransformResponse {
    expectObject() {
        return function expectObject(data, headers, status) {
            return TransformResponse.transformResponse(data, headers, status, {});
        }
    }

    expectArray() {
        return function expectArray(data, headers, status) {
            return TransformResponse.transformResponse(data, headers, status, []);
        }
    }

    static transformResponse(data, headers, status, defaultValue) {
        if (status >= 200 && status < 300) {
            return angular.fromJson(data || defaultValue) || defaultValue;
        } else if (status === 400) {
            return angular.fromJson(data);
        } else {
            return defaultValue;
        }
    }
}

import bootstrap from 'bootstrap';

bootstrap.service('TransformResponse', TransformResponse);

export default TransformResponse;
