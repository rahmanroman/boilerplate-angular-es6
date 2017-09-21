import {
    JSON_STORE_LOAD,
    JSON_STORE_INCREASE_COUNT
} from 'stores/JsonStore';

import template from 'components/post-list/post-list.html';
import 'components/post-list/post-list.scss';

class PostListCtrl {
    constructor($timeout, JsonStore) {
        "ngInject";

        this.JsonStore = JsonStore;

        JsonStore.subscribe((state, type) => {
            this.state = state;

            if ((type === JSON_STORE_LOAD || type === JSON_STORE_INCREASE_COUNT) && this.state.count < 100) {
                // $timeout(() => {
                //     JsonStore.increase();
                // }, 1500);
            }
        });

        JsonStore.load();
        JsonStore.increase(19);
    }

    click(index) {
        let {JsonStore} = this;
        JsonStore.remove(index);
    }

    // $onInit() {
    // }
    //
    // $postLink() {
    // }
    //
    // $onChanges(/*changes*/) {
    // }
    //
    // $doCheck() {
    // }
    //
    // $onDestroy() {
    // }
}

import bootstrap from 'bootstrap';

bootstrap.component('postList', {
    bindings: {},
    template: template,
    controller: PostListCtrl
});
