import { GraphDataState } from "./graph_data_state";
type GraphDataListener = (value: number) => void;
export declare class GraphData {
    key: any;
    private _value;
    private listeners;
    constructor(key: any, value: number);
    set value(newValue: number);
    get value(): number;
    addListener(listener: GraphDataListener): void;
    removeListener(listener: GraphDataListener): void;
    notifyListeners(newValue: number): void;
    createState(index: number): GraphDataState;
}
export declare class GraphDataElement extends HTMLElement {
    static observedAttributes: string[];
    data: GraphData;
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: number, newValue: number): void;
}
export {};
