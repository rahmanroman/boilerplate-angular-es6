import bootstrap from 'bootstrap';

bootstrap.service('Store', function ($q) {
    "ngInject";

    class Store {
        constructor(initialState) {
            this.state = initialState;
            this.listeners = [];

            this.isDispatching = false;
            this.dispatchingQueue = [];
        }

        getState() {
            return Object.assign({}, this.state);
        }

        subscribe(listener) {
            if (typeof listener !== 'function') {
                throw new Error('Listener is not a function: subscribe takes only listeners as functions.');
            }

            this.listeners = [...this.listeners, listener];

            listener({
                ...this.state
            });

            return () => (this.listeners = this.listeners.filter(_listener => _listener !== listener));
        }

        dispatch(reducer, type, payload) {
            if (typeof reducer !== 'function') {
                throw new Error('Reducer is not a function: dispatch takes only reducers as functions.');
            }

            if (this.isDispatching === true) {
                this.dispatchingQueue.push({reducer, type, payload});
            } else {
                this.execute(reducer(this.state), type, payload);
            }
        }

        execute(asyncState, type, payload) {
            this.isDispatching = true;

            $q.when(asyncState)
                .then((state) => {
                    this.state = state;

                    for (let i = 0; i < this.listeners.length; i++) {
                        this.listeners[i]({...this.state}, type, payload);
                    }

                    this.isDispatching = false;
                    this.next();
                })
                .catch(() => {
                    // throw new Error(err);
                    this.isDispatching = false;
                    this.next();
                });
        }

        next() {
            if (this.dispatchingQueue.length > 0) {
                let {reducer, type, payload} = this.dispatchingQueue.shift();
                this.execute(reducer(this.state), type, payload);
            }
        }

        static removeFromArray(array, index) {
            return array.filter((_, i) => (index !== i));
        }
    }

    return Store;
});
