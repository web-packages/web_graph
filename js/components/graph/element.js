import { GraphData } from "./data.js";

/** for abstract. */
export class GraphElement extends HTMLElement {
    constructor() {
        super();

        if (this.constructor === GraphElement) {
            throw new Error("The abstract class is cannot call the constructor.");
        }
    }

    /**
     * @param {GraphData} data
     */
    attach(data) {
        throw new Error("This function has not implemented.");
    }

    detech(data) {
        throw new Error("This function has not implemented.");
    }
}