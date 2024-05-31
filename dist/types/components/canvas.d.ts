type CanvasDrawCallback = (context: CanvasRenderingContext2D, ract: DOMRect) => void;
export declare class SharpCanvasElement extends HTMLElement {
    private _drawCallback;
    raw: HTMLCanvasElement;
    observer: ResizeObserver;
    redrawId: number;
    isRedrawing: boolean;
    redraw(): void;
    get draw(): CanvasDrawCallback;
    set draw(callback: CanvasDrawCallback);
    getContext2D(): CanvasRenderingContext2D;
    createRaw(): HTMLCanvasElement;
    disconnectedCallback(): void;
    connectedCallback(): void;
}
export {};
