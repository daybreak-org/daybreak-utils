import {it, describe, vitest, beforeEach, vi, afterEach, expect} from "vitest";
import {debounce} from "./index";

const fnMock = vitest.fn();

describe("debounce", () => {
    beforeEach(() => {
        vi.useFakeTimers()
    });
    afterEach(() => {
        vi.useRealTimers();
        vi.clearAllMocks();
    });
    it("should call function after delay", () => {
        const debounced = debounce(fnMock, 999);
        debounced();
        vi.advanceTimersByTime(2000);
        expect(fnMock).toHaveBeenCalled();
    });

    it("should not call function before delay", () => {
        const debounced = debounce(fnMock, 1001);
        debounced();
        vi.advanceTimersByTime(1000);
        expect(fnMock).not.toHaveBeenCalled();
    });

    it("should call function after last called delay has passed", () => {
        const debounced = debounce(fnMock, 500);
        debounced();
        vi.advanceTimersByTime(400);
        debounced();
        vi.advanceTimersByTime(200);
        expect(fnMock).not.toHaveBeenCalled();
        vi.advanceTimersByTime(300);
        expect(fnMock).toHaveBeenCalled();
    })
})