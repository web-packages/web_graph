!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).index={})}(this,(function(e){"use strict";class t extends HTMLElement{get draw(){return this._drawCallback}set draw(e){this._drawCallback=e,void 0!==this.raw&&this._drawCallback(this.getContext2D(),this.raw.getBoundingClientRect())}getContext2D(){return this.raw.getContext("2d")}createRaw(){const e=document.createElement("canvas");return e.style.width=this.style.width,e.style.height=this.style.height,e}disconnectedCallback(){this.observer.disconnect()}connectedCallback(){this.style.display="flex",this.observer=new ResizeObserver((e=>{const t=this.getContext2D(),s=this.raw.getBoundingClientRect(),a=devicePixelRatio||1;this.raw.width=s.width*a,this.raw.height=s.height*a,t.scale(a,a),this.draw&&this.draw(t,s)})),this.observer.observe(this.raw=this.createRaw());this.attachShadow({mode:"closed"}).appendChild(this.raw)}}customElements.define("sharp-canvas",t);class s extends HTMLElement{attach(e){throw new Error("This function has not implemented.")}detech(e){throw new Error("This function has not implemented.")}}class a{constructor(e,t){this.data=e,this.index=t}}class i{constructor(e,t){if(this.key=e,this.key=e,this._value=t,isNaN(t)||"number"!=typeof t)throw new Error("The value of line graph must always be an number.");this.listeners=[]}set value(e){this.notifyListeners(this._value=e)}get value(){return this._value}addListener(e){if(this.listeners.includes(e))throw new Error("A given listener is already registered.");this.listeners.push(e)}removeListener(e){if(!this.listeners.includes(e))throw new Error("A given listener is already not registered.");this.listeners=this.listeners.filter((t=>t!==e))}notifyListeners(e){this.listeners.forEach((t=>t(e)))}createState(e){return new a(this,e)}}class n extends HTMLElement{connectedCallback(){const e=this.getAttribute("key"),t=Number(this.getAttribute("value"));if(null==t)throw new Error("Required attribute 'value' not defined in <graph-data> element.");this.data=new i(e,t)}attributeChangedCallback(e,t,s){if(null!=t&&t!=s){if("key"==e)throw new Error("The key, which is a unique identifier of the graph data cannot be changed.");this.data.value=s}}}n.observedAttributes=["key","value"],customElements.define("graph-data",n);class r extends a{constructor(e){super(e.data,e.index)}draw(e,t,s,a){e.canvas.width,e.canvas.height}}class h extends s{constructor(){super(...arguments),this.states=[]}get stateLength(){return this.states.length}attach(e){const t=this.stateLength,s=new r(e.createState(t));s.data.addListener((e=>{console.log(s.data.key+" = "+e)})),this.states.push(s)}detech(e){this.states=this.states.filter((t=>t.data!==e))}draw(e,t){if(this.stateLength<1)throw new Error("The attached graph-data states for a line must be at least one.");const s=t.width/this.stateLength;console.log(s),e.beginPath(),e.strokeStyle="rgb(0, 100, 255)",e.lineWidth=3,e.lineCap="round",e.moveTo(15,15),e.lineTo(t.width/2-15,t.height-15),e.lineTo(t.width-15,t.height/2),e.stroke()}createCanvas(){var e,t;const s=document.createElement("sharp-canvas");return s.style.width=null!==(e=this.getAttribute("width"))&&void 0!==e?e:"100%",s.style.height=null!==(t=this.getAttribute("height"))&&void 0!==t?t:"250px",s.draw=(e,t)=>this.draw(e,t),s}disconnectedCallback(){this.observer.disconnect()}connectedCallback(){var e;let t=null!==(e=this.getAttribute("initstate"))&&void 0!==e?e:this.getAttribute("initState");null!=t&&new Function(t)(),this.style.display="flex";this.attachShadow({mode:"open"}).appendChild(this.canvas=this.createCanvas());for(const e of this.children){if(e instanceof n==0)throw"All children of graph elements must only <graph-data> elements defined.";this.attach(e.data)}this.observer=new MutationObserver(((e,t)=>{const s=e=>{if(e instanceof n==0)throw new Error("The element attached to this element is not a <graph-data> element.");this.attach(e.data)},a=e=>{if(e instanceof n==0)throw new Error("The element detached to this element is not a <graph-data> element.");this.detech(e.data)};for(const t of e){const e=t.addedNodes,i=t.removedNodes;0!=e.length&&e.forEach(s),0!=i.length&&i.forEach(a)}})),this.observer.observe(this,{childList:!0})}}customElements.define("line-graph",h),e.GraphData=i,e.GraphDataElement=n,e.GraphDataState=a,e.GraphElement=s,e.LineGraphDataState=r,e.LineGraphElement=h,e.SharpCanvasElement=t}));
//# sourceMappingURL=index.js.map