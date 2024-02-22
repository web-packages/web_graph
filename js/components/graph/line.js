import { SharpCanvasElement } from "../canvas/element.js";
import { GraphData, GraphDataElement } from "./data.js";
import { GraphDataState } from "./data_state.js";



class LineGraphDataState extends GraphDataState {
    /**
     * @param {GraphDataState} parent
     */
    constructor(parent) {
        super(parent.data, parent.index);
    }

    /**
     * @param {CanvasRenderingContext2D} c
     * @param {number} lower - x point
     * @param {number} upper - x point
     */
    draw(c, minX, maxX) {
        throw new Error("draw() function not implemented.");
    }
}

class LineGraphElement extends HTMLElement {
    constructor() {
        super();

        /** @type {LineGraphDataState[]} */
        this.states = [];
    }
    
    /**
     * Returns the total length of the attached graph states.
     * 
     * @returns {number}
     */
    get stateLength() {
        return this.states.length;
    }

    /**
     * @param {GraphData} data 
     */
    attach(data) {
        const index = this.stateLength;
        const state = new LineGraphDataState(data.createState(index));
        state.data.addListener((value) => {
            // change value.
            console.log(value);
        });

        this.states.push(state);
    }

    /**
     * @param {CanvasRenderingContext2D} c
     * @param {DOMRect} r
    */
    draw(c, r) {
        if (this.stateLength > 1) {
            throw new Error("The attached graph data states of line must be at least one.");
        }

        c.beginPath();
        c.strokeStyle = "rgb(0, 100, 255)";
        c.lineWidth = 3;
        c.lineCap = "round";
        c.moveTo(15, 15);
        c.lineTo((r.width / 2) - 15, r.height - 15);
        c.lineTo(r.width - 15, r.height / 2)
        c.stroke();
    }

    /**
     * @returns {SharpCanvasElement}
    */
    createCanvas() {
        const canvas = document.createElement("sharp-canvas");
        canvas.style.width  = this.getAttribute("width") ?? "100%";
        canvas.style.height = this.getAttribute("height") ?? "250px";

        canvas.draw = this.draw;

        return canvas;
    }
    
    connectedCallback() {
        let initStateFunc = this.getAttribute("initstate");
        if (initStateFunc != null) {
            eval(initStateFunc); // for initialize graph datas.
        }

        this.style.display = "flex";

        const shadow = this.attachShadow({ mode: "open" });
              shadow.appendChild(this.canvas = this.createCanvas());
        
        for (const /** @type {GraphDataElement} */ child of this.children) {
            if (child instanceof GraphDataElement == false) {
                throw "All children of graph elements must only <graph-data> elements defined.";
            }
            
            this.attach(child.data);
        }
    }
}

customElements.define("line-graph", LineGraphElement);