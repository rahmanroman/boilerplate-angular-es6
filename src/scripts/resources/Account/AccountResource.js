import { Service, Inject } from "bootstrap";

@Service({
    name: 'AccountResource'
})
@Inject('$timeout')
class AccountResource {
    constructor($timeout) {
        this.$timeout = $timeout;
    }

    get() {
        return this.$timeout(() => ({
            authorities: ['ROLE_USER', 'ROLE_ADMIN']
        }), 250);
    }
}

export default AccountResource
