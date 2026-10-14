import {beforeEach, describe, expect, it, vi, vitest} from "vitest";
import {createEmitter} from "./event";

const mockFnOne = vitest.fn();
const mockFnTwo = vitest.fn();

describe("createEmitter", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })
    it("should execute callback when test event is created and emitted", () => {
        const emitter = createEmitter();
        emitter.on("test", mockFnOne);
        emitter.emit("test");
        expect(mockFnOne).toHaveBeenCalledOnce();
    });
    it("should remove the listener if 'off' is called on existing event and listener", () => {
        const emitter = createEmitter();
        emitter.on("test", mockFnOne);
        emitter.off("test", mockFnTwo);
        emitter.emit("test");
        expect(mockFnTwo).not.toHaveBeenCalled();
    });
    it("should throw an error when trying to remove event that does not exist", () => {
        const emitter = createEmitter();
        expect(() => emitter.off("test", mockFnOne)).toThrow("Cannot unsubscribe from event that does not exist")
    });

    it("should throw an error when trying to emit event that does not exist", () => {
        const emitter = createEmitter();
        expect(() => emitter.emit("test")).toThrow("Cannot emit event that does not exist")
    });
})