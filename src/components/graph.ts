import { GraphData } from "../graph_data";

export abstract class GraphElement extends HTMLElement {
    abstract attach(data: GraphData): void;
    abstract detech(data: GraphData): void;
}