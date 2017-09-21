import bootstrap from 'bootstrap';

bootstrap.service('RxStore', function ($q) {
    "ngInject";

    class RxStore {
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

            this.listeners = this.listeners.concat(listener);
            // TODO: return unscubscribe function;
        }

        dispatch(reducer, type) {
            if (typeof reducer !== 'function') {
                throw new Error('Reducer is not a function: dispatch takes only reducers as functions.');
            }

            if (this.isDispatching === true) {
                this.dispatchingQueue.push({reducer, type});
            } else {
                this.execute(reducer(this.state), type);
            }
        }

        execute(asyncState, type) {
            this.isDispatching = true;

            $q.when(asyncState)
                .then((state) => {
                    this.state = state;

                    for (let i = 0; i < this.listeners.length; i++) {
                        this.listeners[i](Object.assign({}, this.state), type);
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
                let {reducer, type} = this.dispatchingQueue.shift();
                this.execute(reducer(this.state), type);
            }
        }

        static removeFromArray(array, index) {
            return array.filter((_, i) => (index !== i));
        }
    }

    return RxStore;
});
