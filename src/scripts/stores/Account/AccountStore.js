import { Service, Inject, Run } from "bootstrap";

import Store from "services/store/Store";

import 'resources/Account/AccountResource';

@Service({
    name: 'AccountStore'
})
@Inject('AuthStore', 'AccountResource')
class AccountStore extends Store {
    constructor(AuthStore, AccountResource) {
        super();

        this.token = null;

        this.AuthStore = AuthStore;
        this.AccountResource = AccountResource;

        this.AuthStore.subscribe(state => {
            if (state.token !== this.token) {
                this.token = state.token;

                if (state.token !== null) {
                    this.update();
                } else {
                    this.clear();
                }
            }
        });
    }

    update() {
        this.AccountResource.get().then(response => {
            this.dispatch(state => ({
                ...state,
                ...response
            }), 'UPDATE');

            this.AuthStore.setRoles(this.state.roles);
        });
    }

    @Run()
    @Inject('$rootScope', 'AccountStore')
    static JustForInject($rootScope, AccountStore) {
        $rootScope.Account = AccountStore;
    }
}

export default AccountStore;
