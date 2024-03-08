import { GraphDataState } from "./data_state.js";

/**
 * @typedef {(value: number) => void} GraphDataListener
 */

export class GraphData {
    /**
     * @param {any} key 
     * @param {number} value 
     */
    constructor(
        key,
        value
    ) {
        /**
         * If the value is null,
         * the graph element identifies the value based on the unique index of the data.
         * 
         * @type {any}
         */
        this.key = key;

        /** @type {number} */
        this._value = value;
        if (isNaN(value) || typeof value != "number") {
            throw new Error("The value of line graph must always be an number.");
        }
        
        /** @type {GraphDataListener[]} */
        this.listeners = [];
    }

    set value(newValue) {
        this.notifyListeners(this._value = newValue);
    }

    get value() { return this._value; }

    /**
     * Registers a callback that is called when the value is updated.
     * 
     * @param {GraphDataListener} listener
     */
    addListener(listener) {
        if (this.listeners.includes(listener)) {
            throw new Error("A given listener is already registered.");
        }

        this.listeners.push(listener);
    }

    /**
     * Unregister a registered callback in this graph data.
     * 
     * @param {GraphDataListener} listener
     */
    removeListener(listener) {
        if (!this.listeners.includes(listener)) {
            throw new Error("A given listener is already not registered.");
        }
        
        this.listeners = this.listeners.filter(e => e !== listener);
    }

    /**
     * @param {number} newValue
     */
    notifyListeners(newValue) {
        this.listeners.forEach(func => func(newValue));
    }

    /**
     * @param {number} index
     * @returns {GraphDataState}
     */
    createState(index) {
        return new GraphDataState(this, index);
    }
}

export class GraphDataElement extends HTMLElement {
    static observedAttributes = ["key", "value"];
    
    connectedCallback() {
        /** @type {any} */
        const key = this.getAttribute("key");
        
        /** @type {number} */
        const value = Number(this.getAttribute("value"));
        if (value == null) {
            throw new Error("Required attribute 'value' not defined in <graph-data> element.");
        }

        // The element attributes to an instance.
        this.data = new GraphData(key, value);
    }

    /**
     * Called when a attributes of this element changes,
     * And `key` attribute value must not be changed.
     * 
     * @param {string} name
     * @param {string} oldValue
     * @param {string} newValue
     */
    attributeChangedCallback(name, oldValue, newValue) {
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