class Store {
    state = {};
    listeners = [];
    isDispatching = false;

    constructor() {
    }

    getState() {
        return Object.assign({}, this.state);
    }

    clear() {
        this.dispatch(() => ({}), 'CLEAR');
    }

    subscribe(listener) {
        if (typeof listener !== 'function') {
            throw new Error('Listener is not a function: subscribe takes only listeners as functions.');
        }

        this.listeners = [...this.listeners, listener];

        listener({...this.state});

        return () => (this.listeners = this.listeners.filter(_listener => _listener !== listener));
    }

    dispatch(reducer, type, payload) {
        if (typeof reducer !== 'function') {
            throw new Error('Reducer is not a function: dispatch takes only reducers as functions.');
        }

        if (this.isDispatching) throw new Error('Reducers may not dispatch actions.');

        this.isDispatching = true;

        try {
            this.state = reducer(this.state);
        } finally {
            this.isDispatching = false;
        }

        for (let i = 0; i < this.listeners.length; i++) {
            this.listeners[i]({...this.state}, type, payload);
        }

        return this.state;
    }

    static removeFromArray(array, index) {
        return array.filter((_, i) => (index !== i));
    }
}

export default Store;
