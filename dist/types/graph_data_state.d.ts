import { AnimationListener, AnimationStatusListener } from "animatable-js/dist/types/type";
import { GraphData } from "./graph_data";
import { Animatable } from "animatable-js";
export declare class GraphDataState implements Animatable {
    data: GraphData;
    index: number;
    private animation;
    constructor(data: GraphData, index: number);
    addListener(listener: AnimationListener): void;
    removeListener(listener: AnimationListener): void;
    addStatusListener(listener: AnimationStatusListener): void;
    removeStatusListener(listener: AnimationStatusListener): void;
    dispose(): void;
}
