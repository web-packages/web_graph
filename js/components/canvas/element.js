
/**
 * @typedef {(context: CanvasRenderingContext2D, ract: DOMRect) => void} CanvasDrawCallback
 */

export class SharpCanvasElement extends HTMLElement {
    constructor() {
        super(); // is required called.
    }

    /**
     * This getter returns draw callback.
     * 
     * @returns {CanvasDrawCallback}
     */
    get draw() {
        return this._draw;
    }
    
    /**
     * This setter defines given draw callback.
     * 
     * @type {CanvasDrawCallback}
     */
    set draw(func) {
        this._draw = func;

        // Must be redraw when the canvas is already attached to element tree.
        if (this.raw !== undefined) {
            this._draw(this.getContext2D(), this.raw.getBoundingClientRect());
        }
    }

    /**
     * Returns 2D during canvas context.
     * 
     * @returns {CanvasRenderingContext2D}
    */
    getContext2D() {
        return this.raw.getContext("2d");
    }

    // Returns the canvas element.
    createRaw() {
        const canvas = document.createElement("canvas");
        canvas.style.width  = this.style.width;
        canvas.style.height = this.style.height;
        
        return canvas;
    }

    disconnectedCallback() {
        this.observer.disconnect();
    }

    connectedCallback() {
        this.style.display = "flex";

        // This observer callback is called not only when the resized,
        // but also when the initial size measured.
        //
        this.observer = new ResizeObserver(_ => {
            const context = this.getContext2D();
            const ract    = this.raw.getBoundingClientRect();
            const ppi     = devicePixelRatio || 1;

            this.raw.width  = ract.width  * ppi;
            this.raw.height = ract.height * ppi;
            context.scale(ppi, ppi);

            // The canvas content is initialized when the size is updated.
            if (this.draw) this.draw(context, ract);
        });
        
        this.observer.observe(this.raw = this.createRaw());
        
        // Attach the created raw canvas to this element tree.
        const shadow = this.attachShadow({ mode: "closed" });
              shadow.appendChild(this.raw);
    }
}

customElements.define("sharp-canvas", SharpCanvasElement);