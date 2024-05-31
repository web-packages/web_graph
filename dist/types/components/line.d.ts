import { SharpCanvasElement } from "./canvas";
import { GraphData } from "../graph_data";
import { GraphDataState } from "../graph_data_state";
import { GraphElement } from "./graph";
export declare class LineGraphDataState extends GraphDataState {
    constructor(parent: GraphDataState);
    lerp(start: number, end: number, amount: number): number;
    draw(c: CanvasRenderingContext2D, minX: number, maxX: number, maxValue: number): void;
}
export declare class LineGraphElement extends GraphElement {
    states: LineGraphDataState[];
    observer: MutationObserver;
    canvas: SharpCanvasElement;
    get stateLength(): number;
    attach(data: GraphData): void;
    detech(data: GraphData): void;
    draw(c: CanvasRenderingContext2D, r: DOMRect): void;
    createCanvas(): SharpCanvasElement;
    disconnectedCallback(): void;
    connectedCallback(): void;
}
