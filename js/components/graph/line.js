import { GraphDataElement } from "./data.js";



class LineGraphElement extends HTMLElement {
    /**
     * @param {number} value 
     */
    attach(value) {
        if (isNaN(value) || typeof value != "number") {
            throw "The value of line graph must always be an number.";
        }

        console.log(value);
    }

    createCanvas() {
        const canvas = document.createElement("canvas");
        canvas.style.width = "100%";

        const resize = () => {
            const ract = canvas.getBoundingClientRect();

            // Redefining graph canvas size considering dpi.
            canvas.width  = ract.width * devicePixelRatio;
            canvas.hieght = ract.height * devicePixelRatio;
        }
        
        resize();
        addEventListener("resize", resize);

        return canvas;
    }
    
    connectedCallback() {
        let width  = this.getAttribute("width") ?? "100%";
        let height = this.getAttribute("height") ?? "250px";

        let initStateFunc = this.getAttribute("initstate");
        if (initStateFunc != null) {
            eval(initStateFunc); // for initialize graph datas.
        }
        
        for (const /** @type {GraphDataElement} */ child of this.children) {
            if (child instanceof GraphDataElement == false) {
                throw "All children of graph elements must only <graph-data> elements defined.";
            }

            this.attach(child.value);
        }

        this.style.width = width;
        this.style.height = height;
        this.style.display = "flex";

        const shadow = this.attachShadow({ mode: "open" });
              shadow.appendChild(this.canvas = this.createCanvas());
    }
}

customElements.define("line-graph", LineGraphElement);