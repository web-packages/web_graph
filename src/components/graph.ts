import { GraphData } from "../graph_data";
import { GraphDataState } from "../graph_data_state";

export abstract class GraphElement<T extends GraphDataState> extends HTMLElement {
    abstract attach(data: GraphData): void;
    abstract detech(data: GraphData): void;
    abstract createGraphState(index: number, data: GraphData): T;
}