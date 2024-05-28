import { AnimationListener, AnimationStatusListener } from "animatable-js/dist/types/type";
import { GraphData } from "./graph_data";
import { Animatable, Animation } from "animatable-js";

export class GraphDataState implements Animatable { // data class
    private animation = new Animation(1000);
    
    constructor(
        public data: GraphData,
        public index: number,
    ) {
        this.animation.value = data.value;
    }

    addListener(listener: AnimationListener): void {
        this.animation.addListener(listener);
    }

    removeListener(listener: AnimationListener): void {
        this.animation.removeListener(listener);
    }

    addStatusListener(listener: AnimationStatusListener): void {
        this.addStatusListener(listener);
    }

    removeStatusListener(listener: AnimationStatusListener): void {
        this.removeStatusListener(listener);
    }

    dispose(): void {
        this.animation.dispose();
        this.animation = null;
    }
}