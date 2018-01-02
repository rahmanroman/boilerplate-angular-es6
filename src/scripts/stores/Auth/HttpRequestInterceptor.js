import { Inject, Config } from "bootstrap";

class HttpRequestInterceptor {
    @Config()
    @Inject('$httpProvider')
    static SetHttpRequestInterceptor($httpProvider) {
        $httpProvider.interceptors.push(['AuthStore', function (AuthStore) {
            let token = null;

            AuthStore.subscribe(state => {
                if (state.token !== token) token = state.token;
            });

            return {
                request: function (config) {
                    if (token && !config.headers.Authorization) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }

                    return config;
                },

                requestError: function (config) {
                    return config;
                },

                response: function (response) {
                    let headers = response.headers;
                    let bearerToken = headers('Authorization');

                    if (angular.isString(bearerToken) && bearerToken.startsWith('Bearer')) {
                        let token = bearerToken.slice(7);
                        AuthStore.setToken(token);
                    }

                    return response;
                },

                responseError: function (response) {
                    // TODO: token has expired
                    return response;
                }
            }
        }])
    }
}

export default HttpRequestInterceptor;
