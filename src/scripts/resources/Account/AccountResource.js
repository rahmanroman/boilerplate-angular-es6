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
            roles: ['USER', 'ADMIN']
        }), 250);
    }
}

export default AccountResource
