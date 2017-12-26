import 'resources/JsonPlaceholder';

import { Inject, Service } from "bootstrap";

import Store from 'services/store/Store';

@Service({
    name: 'JsonStore'
})
@Inject('JsonPlaceholderResource')
class JsonStore extends Store {
    constructor(JsonPlaceholderResource) {
        super();

        this.JsonPlaceholderResource = JsonPlaceholderResource;

        this.dispatch(() => ({
            posts: [],
            count: 1
        }));
    }

    load() {
        this.JsonPlaceholderResource.posts().then(posts => {
            this.dispatch(state => ({
                ...state,
                posts
            }), JSON_STORE_LOAD);
        });
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

export default JsonStore;

export const JSON_STORE_LOAD = 'LOAD';
export const JSON_STORE_INCREASE_COUNT = 'INCREASE_COUNT';
export const JSON_STORE_REMOVE = 'REMOVE';
