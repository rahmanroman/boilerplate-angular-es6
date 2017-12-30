import { Service, Inject } from "bootstrap";

@Service({
    name: 'StorePersistent'
})
@Inject('$localStorage')
class StorePersistent {
    constructor($localStorage) {
        this.$localStorage = $localStorage;
    }

    store(name, store) {
        let {$localStorage} = this;

        store.subscribe((state, type) => {
            if (typeof type !== 'undefined') {
                $localStorage[name] = state;
            }
        });

        let state = $localStorage[name];

        if (typeof state !== 'undefined') {
            store.dispatch(() => state, 'RESTORED');
        }
    }
}

export default StorePersistent;
