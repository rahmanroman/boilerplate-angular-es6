// import {
//     JSON_STORE_LOAD,
//     JSON_STORE_INCREASE_COUNT
// } from 'stores/JsonStore';
//
import { Component, Inject } from 'bootstrap';

@Component({
    selector: 'postList',
    templateUrl: 'components/post-list/post-list.html',
    styleUrl: 'components/post-list/post-list.scss',
    bindings: {}
})
@Inject('$interval', 'JsonStore')
class PostListComponent {
    constructor($interval, JsonStore) {
        this.$interval = $interval;
        this.JsonStore = JsonStore;

        JsonStore.subscribe((state) => {
            this.state = state;
        });

        JsonStore.load();
        this.start();
    }

    start() {
        // let {$interval, JsonStore} = this;
        //
        // JsonStore.reset();
        //
        // let promise = $interval(() => {
        //     if (this.state.count < 10) JsonStore.increase();
        //     else $interval.cancel(promise);
        // }, 500);
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

export default PostListComponent;
