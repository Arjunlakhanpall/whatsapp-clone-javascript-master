export class ClassEvent {

    constructor() {

        this._events = {};

    }

    on(eventName, func) {

        if (!this._events[eventName]) this._events[eventName] = new Array();

        this._events[eventName].push(func)
    }

    trigger() {

        let args = [...arguments];
        let eventName = args.shift();

        args.push(new Event(eventName));

        if (this._events[eventName] instanceof Array) {

            this._events[eventName].forEach(func => {

                func.apply(null, args)

            });
        }
    }
}