import { Run, Inject } from "bootstrap";

class RouteChangeInterceptor {
    @Run()
    @Inject('$transitions', '$state', 'AuthStore')
    static SetRouteChangeInterceptor($transitions, $state, AuthStore) {
        $transitions.onBefore({
            to: function (state) {
                return state.data && state.data.authorities;
            }
        }, function (transition) {
            let $state = transition.router.stateService;
            let toState = transition.to();

            if (!AuthStore.hasAuthorities(toState.data.authorities)) {
                return $state.target(
                    AuthStore.isAuthenticated() ? 'home' : 'login',
                    undefined,
                    {location: true}
                );
            }

            // console.log(transition.treeChanges().to
            //     .map(node => node.state.self.url)
            //     .filter(x => x != null && x !== '^')
            //     .join(''));
        }, {
            priority: 10
        });

        AuthStore.subscribe((state, type) => {
            switch (type) {
                case 'SET_ROLES':
                    let state = $state.current;

                    if (state.data && state.data.authorities && !AuthStore.hasAuthorities(state.data.authorities)) {
                        $state.go(AuthStore.isAuthenticated() ? 'home' : 'login');
                    }

                    break;

                case 'LOGOUT':
                    $state.go('login');
                    break;
            }
        });
    }
}

export default RouteChangeInterceptor;
