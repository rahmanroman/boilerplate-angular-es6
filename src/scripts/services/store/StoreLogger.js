import { Service } from "bootstrap";

@Service({
    name: 'StoreLogger'
})
class StoreLogger {
    log(name, store) {
        store.subscribe((state, type, payload) => {
            console.log(`%c${name} ==>`, 'color:#000; font-weight:bold');
            console.log('\tstate', state);
            console.log('\ttype', type);
            console.log('\tpayload', payload);
        });
    }
}

export default StoreLogger;
