import { EventEmitter } from "events";

export default class Time extends EventEmitter {
    constructor() {
        super();
        this.start = Date.now();
        this.current = this.start;
        this.delta = 16;
        this.elapsed = 0;
        this.update();
    }
    update() {
        this.currentTime = Date.now();
        this.delta = this.currentTime - this.current;
        this.current = this.currentTime;
        this.elapsed = this.current - this.start;
        window.requestAnimationFrame(() => this.update());
        this.emit('update');
    }
}