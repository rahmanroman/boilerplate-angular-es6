import 'resources/JsonPlaceholder';
import 'stores/JsonStore';

import 'components/post-list/post-list';

import { Route, Inject } from "bootstrap";

@Route({
    name: 'home',
    url: '/',

    data: {
        authorities: ['ROLE_USER', 'ROLE_ADMIN']
    },

    resolve: {
        users: ['JsonPlaceholderResource', JsonPlaceholderResource => JsonPlaceholderResource.users()]
    },

    templateUrl: 'states/home/home.html',
    styleUrl: 'states/home/home.scss'

})
@Inject('users')
class HomeRoute {
    constructor(users) {
        "njInject";

        console.log('Users', users);
    }
}

export default HomeRoute;
