import 'resources/JsonPlaceholder';
import 'stores/JsonStore';

import 'components/post-list/post-list';

import { Route, Inject } from "bootstrap";

@Route({
    name: 'home',
    url: '/',

    data: {
        authorities: ['USER']
    },

    resolve: {
        users: ['JsonPlaceholderResource', JsonPlaceholderResource => JsonPlaceholderResource.users()]
    },

    templateUrl: 'states/home/home.html',
    styleUrl: 'states/home/home.scss'

})
@Inject('users', 'AuthStore')
class HomeRoute {
    constructor(users, AuthStore) {
        this.users = users;
        this.AuthStore = AuthStore;
    }

    logout() {
        this.AuthStore.logout();
    }
}

export default HomeRoute;
