import { Route, Inject } from "bootstrap";

@Route({
    name: 'login',
    url: '/login',

    data: {
        authorities: ['^USER']
    },

    templateUrl: 'states/login/login.html',
    styleUrl: 'states/login/login.scss'
})
@Inject('AuthStore')
class LoginRoute {
    constructor(AuthStore) {
        this.AuthStore = AuthStore;
    }

    login() {
        this.AuthStore.login();
    }
}

export default LoginRoute;
