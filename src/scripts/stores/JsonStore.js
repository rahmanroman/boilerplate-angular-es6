import 'services/store/Store';
import 'resources/JsonPlaceholder';

import bootstrap from 'bootstrap';

bootstrap.factory('JsonStore', function (Store, JsonPlaceholder) {
    "ngInject";

    class JsonStore extends Store {
        load() {
            this.dispatch(state => {
                return JsonPlaceholder.posts().then((posts) => {
                    return {
                        ...state,
                        posts
                    }
                })
            }, JSON_STORE_LOAD);
        }

        increase(amount = 1) {
            this.dispatch(state => {
                return {
                    ...state,
                    count: state.count + amount
                }
            }, JSON_STORE_INCREASE_COUNT, amount);
        }

        remove(index) {
            this.dispatch(state => {
                return {
                    ...state,
                    posts: Store.removeFromArray(state.posts, index)
                }
            }, JSON_STORE_REMOVE);
        }
    }

    return new JsonStore({count: 1});
});

export const JSON_STORE_LOAD = 'LOAD';
export const JSON_STORE_INCREASE_COUNT = 'INCREASE_COUNT';
export const JSON_STORE_REMOVE = 'REMOVE';
