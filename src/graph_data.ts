import { GraphDataState } from "./graph_data_state";

type GraphDataListener = (value: number) => void;

export class GraphData {
    private _value: number;
    private listeners: GraphDataListener[];

    constructor(
        public key: any,
        value: number
    ) {
        /**
         * If the value is null,
         * the graph element identifies the value based on the unique index of the data.
         */
        this.key = key;

        this._value = value;
        if (isNaN(value) || typeof value != "number") {
            throw new Error("The value of line graph must always be an number.");
        }
        
        /** @type {GraphDataListener[]} */
        this.listeners = [];
    }

    set value(newValue: number) {
        this.notifyListeners(this._value = newValue);
    }

    get value() { return this._value; }

    /** Registers a callback that is called when the value is updated.  */
    addListener(listener: GraphDataListener) {
        if (this.listeners.includes(listener)) {
            throw new Error("A given listener is already registered.");
        }

        this.listeners.push(listener);
    }

    /** Unregister a registered callback in this graph data. */
    removeListener(listener: GraphDataListener) {
        if (!this.listeners.includes(listener)) {
            throw new Error("A given listener is already not registered.");
        }
        
        this.listeners = this.listeners.filter(e => e !== listener);
    }

    notifyListeners(newValue: number) {
        this.listeners.forEach(func => func(newValue));
    }

    createState(index: number): GraphDataState {
        return new GraphDataState(this, index);
    }
}

export class GraphDataElement extends HTMLElement {
    static observedAttributes = ["key", "value"];
    data: GraphData;
    
    connectedCallback() {
        const key: any = this.getAttribute("key");
        
        const value: number = Number(this.getAttribute("value"));
        if (value == null) {
            throw new Error("Required attribute 'value' not defined in <graph-data> element.");
        }

        // The element attributes to an instance.
        this.data = new GraphData(key, value);
    }

    /**
     * Called when a attributes of this element changes,
     * And `key` attribute value must not be changed.
     */
    attributeChangedCallback(
        name: string,
        oldValue: number,
        newValue: number
    ) {
        if (oldValue != null && oldValue != newValue) { 
            if (name == "key") {
                throw new Error(
                    "The key, which is a unique identifier of the graph data " +
                    "cannot be changed."
                );
            }

            this.data.value = newValue;
        }
    }
}

customElements.define("graph-data", GraphDataElement);