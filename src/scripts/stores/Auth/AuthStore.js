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

    isAuthenticated() {
        return (this.state.token !== null && this.state.roles.length > 0);
    }

    hasAuthorities(authorities = []) {
        // return authorities.reduce((acc, role) => (acc && this.state.roles.includes(role)), true);

        return authorities.reduce((acc, role) => {
            if (role.startsWith('^')) {
                return (acc && !this.state.roles.includes(role.slice(1)));
            } else {
                return (acc && this.state.roles.includes(role));
            }
        }, true);
    }
}

export default AuthStoreService;
