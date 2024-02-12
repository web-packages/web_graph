import { GraphDataState } from "./data_state.js";



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
        this.value = value;

        if (isNaN(value) || typeof value != "number") {
            throw new Error("The value of line graph must always be an number.");
        }
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
    /**
     * Returns the given property values to the one instance.
     * 
     * @returns {GraphData}
    */
    get data() {
        return new GraphData(this.key, this.value);
    }

    connectedCallback() {
        /** @type {any} */
        this.key = this.getAttribute("key");
        
        /** @type {number} */
        this.value = Number(this.getAttribute("value"));
        if (this.value == null) {
            throw new Error("Required property value not defined in <graph-data> element.");
        }
    }
}

customElements.define("graph-data", GraphDataElement);