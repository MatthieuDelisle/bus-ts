class Target<T> {
    private _data: T;
    get data(): T {
        return this._data;
    }

    set data(value: T) {
        this._data = value;
        this.notifyObservers(value);
    }

    // It is useful when we only want to keep one observer.
    maxObservers: number;

    observers : ((d: T) => void)[] = [];

    constructor(data: T, maxObservers: number = -1) {
        this._data = data;
        this.maxObservers = maxObservers;
    }

    addObserver = (f: (d: T) => void) => {
        // We want to keep the number of observers under the maximum observers.
        if(this.maxObservers !== -1)
            while(this.observers.length >= this.maxObservers) {
                this.observers.pop();
            }

        this.observers.push(f);
    }

    detachObserver = (f: (d: T) => void) => {
        let i = this.observers.indexOf(f);
        console.log("Detech at index " + i);
        this.observers.splice(i, 1);
    }

    notifyObservers = (value: T) => {
        console.log("Notify " + this.observers.length + " observers.");
        for (let i = 0; i < this.observers.length; i++) {
            this.observers[i](value);
        }
    }
}

export default Target;