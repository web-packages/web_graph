import { GraphData } from "./graph_data";

export class GraphDataState { // data class
    constructor(
        public data: GraphData,
        public index: number,
    ) { }
}