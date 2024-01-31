
export class GraphDataElement extends HTMLElement {
    connectedCallback() {
        /** @type {any} */
        this.key = this.getAttribute("key");
        
        /** @type {number} */
        this.value = Number(this.getAttribute("value"));
        if (this.value == null) {
            throw "Required property value not defined in <graph-data> element.";
        }
    }
}

customElements.define("graph-data", GraphDataElement);