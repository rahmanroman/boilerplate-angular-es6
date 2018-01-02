import { Service, Inject } from "bootstrap";

@Service({
    name: 'AuthResource'
})
@Inject('$timeout')
class AuthResource {
    constructor($timeout) {
        this.$timeout = $timeout;
    }

    login(/*credentials*/) {
        return this.$timeout(() => ({
            token: '0123456789ABCDEF'
        }), 250);
    }

    logout() {

    }
}

export default AuthResource
