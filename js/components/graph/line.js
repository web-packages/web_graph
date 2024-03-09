import { SharpCanvasElement } from "../canvas/element.js";
import { GraphData, GraphDataElement } from "./data.js";
import { GraphDataState } from "./data_state.js";
import { GraphElement } from "./element.js";

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
     * @param {number} maxAmount
     */
    draw(c, minX, maxX, maxAmount) {
        throw new Error("draw() function not implemented.");
    }
}

class LineGraphElement extends GraphElement {
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
            console.log(state.data.key + " = " + value);
        });

        this.states.push(state);
    }

    detech(data) {
        this.states = this.states.filter(state => state.data !== data);
    }

    /**
     * @param {CanvasRenderingContext2D} c
     * @param {DOMRect} r
    */
    draw(c, r) {
        if (this.stateLength < 1) {
            throw new Error("The attached graph-data states for a line must be at least one.");
        }

        const lineGap = r.width / this.stateLength;
        console.log(lineGap);

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

        // Why arrow function wrapping is to allow these member variables to be
        // referenced scope the [this.draw] function.
        canvas.draw = (c, r) => this.draw(c, r);

        return canvas;
    }

    disconnectedCallback() {
        this.observer.disconnect();
    }

    connectedCallback() {
        // A init-state function is provided to attach graph-data state
        // directly from script without initializing the graph-data state through
        // the initial HTML element.
        //
        let initStateFunc = this.getAttribute("initstate")
                         ?? this.getAttribute("initState");

        if (initStateFunc != null) {
            eval(initStateFunc); // for initialize graph datas.
        }

        this.style.display = "flex";

        const shadow = this.attachShadow({ mode: "open" });
              shadow.appendChild(this.canvas = this.createCanvas());

        // Initializes all graph-data state by iterating over children
        // in this element.
        //
        // See also: All children must be <graph-data> elements.
        //
        for (const /** @type {GraphDataElement} */ child of this.children) {
            if (child instanceof GraphDataElement == false) {
                throw "All children of graph elements must only <graph-data> elements defined.";
            }

            this.attach(child.data);
        }
        
        this.observer = new MutationObserver((records, observer) => {
            /** @type {(target: GraphDataElement) => void} */
            const _handleAttached = (target) => {
                if (target instanceof GraphDataElement == false) {
                    throw new Error("The element attached to this element is not a <graph-data> element.");
                }

                this.attach(target.data);
            }
            
            /** @type {(target: GraphDataElement) => void} */
            const _handleDetached = (target) => {
                if (target instanceof GraphDataElement == false) {
                    throw new Error("The element detached to this element is not a <graph-data> element.");
                }

                this.detech(target.data);
            }

            for (const record of records) {
                const attached = record.addedNodes;
                const detached = record.removedNodes;

                if (attached.length != 0) attached.forEach(_handleAttached);
                if (detached.length != 0) detached.forEach(_handleDetached);
            }
        });

        this.observer.observe(this, {childList: true})
    }
}

customElements.define("line-graph", LineGraphElement);