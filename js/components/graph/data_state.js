import { GraphData } from "./data.js";



export class GraphDataState {
    /**
     * @param {GraphData} data
     * @param {number} index 
    */
    constructor(
        data,
        index,
    ) {
        /** @type {GraphData} */
        this.data = data;
        if (data == null || data instanceof! GraphData) {
            throw new Error("The parameter [data] was not given correctly.");
        }

        /** @type {number} */
        this.index = index; // unique index.
    }
}