type callback = (...param: any) => any;
type id = (string|number);

interface IObject {
    [key: id]: callback;
}

class _EventBus {
    public bus: IObject;

    constructor() {
        this.bus = {};
    }

    $off(id: id) {
        delete this.bus[id];
    }

    $on(id: (string|number), callback: callback) {
        this.bus[id] = callback;
    }

    $emit(id: id, ...params: any[]) {
        if(this.bus[id])
            return this.bus[id].apply(null, params);
    }
}

export const EventBus = new _EventBus();