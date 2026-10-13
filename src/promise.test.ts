import {succeedAll} from "./promise";
import {afterEach, describe, expect, it, vi, vitest} from "vitest";

const fnOne = () => [1, 2];
const fnTwo = () => [3, 4];
const fnError = () => Promise.reject(new Error("Test Error"));

describe("succeedAll", () => {
    it('should resolve return both results successfully', async () => {
        const res = succeedAll([fnOne(), fnTwo()]);
        await expect(res).resolves.toEqual([[1, 2], [3, 4]]);
    });
    it("should reject if any promise rejects", async () => {
        const res = succeedAll([fnOne(), fnError()]);
        await expect(res).rejects.toThrow("Test Error");
    })
    it("should return empty results if empty array is passed", async () => {
        const res = succeedAll([]);
        await expect(res).resolves.toEqual([]);
    })
})