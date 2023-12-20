import { validateTitle } from "./title";

describe("validateTitle", () => {
    describe("no description", () => {
        it("should return empty if allowEmpty", () => {
            expect(
                validateTitle(undefined, jest.fn(), true)
            ).toBe("");
            expect(
                validateTitle("", jest.fn(), true)
            ).toBe("");
        });
        it("should return error if not allowEmpty", () => {
            const func = jest.fn(() => "xxx");
            expect(
                validateTitle(undefined, func, false)
            ).toBe("xxx");
            expect(func).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: "secma-base.title.required"
                })
            );
        });
    });
    describe("short description", () => {
        it("should return error", () => {
            const func = jest.fn(() => "xxx");
            expect(
                validateTitle("a", func, false, 2)
            ).toBe("xxx");
            expect(func).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: "secma-base.title.short"
                }), {
                    minLength: 2
                }
            );
        });
    });
    describe("long description", () => {
        it("should return error", () => {
            const func = jest.fn(() => "xxx");
            expect(
                validateTitle("abcd", func, false, 2, 3)
            ).toBe("xxx");
            expect(func).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: "secma-base.title.long"
                }), {
                    maxLength: 3
                }
            );
        });
    });
    describe("valid description", () => {
        it("should return empty", () => {
            expect(
                validateTitle("ac", jest.fn(), false, 2, 4)
            ).toBe("");
            expect(
                validateTitle("abcd", jest.fn(), false, 2, 4)
            ).toBe("");
        });
    });
});
