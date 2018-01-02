import { Service, Inject } from "bootstrap";

import Store from "services/store/Store";

import 'resources/Auth/AuthResource';

@Service({
    name: 'AuthStore'
})
@Inject('AuthResource')
class AuthStoreService extends Store {
    constructor(AuthResource) {
        super();

        this.dispatch(() => ({
            token: null,
            roles: []
        }));

        this.AuthResource = AuthResource;
    }

    login(credentials) {
        this.AuthResource.login(credentials).then(response => {
            this.setToken(response.token);
        });
    }

    logout() {
        this.dispatch(() => ({
            token: null,
            roles: []
        }), 'LOGOUT');
    }

    setToken(token) {
        this.dispatch(state => ({
            ...state,
            token
        }), 'SET_TOKEN', token);
    }

    setRoles(roles) {
        this.dispatch(state => ({
            ...state,
            roles
        }), 'SET_ROLES', roles);
    }

    hasAuthorities(authorities = []) {
        return authorities.reduce((acc, role) => (acc && this.state.roles.includes(role)), true);
    }
}

export default AuthStoreService;
