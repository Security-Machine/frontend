import { validateDescription } from "./description";

describe("validateDescription", () => {
    describe("no description", () => {
        it("should return empty if allowEmpty", () => {
            expect(
                validateDescription(undefined, jest.fn(), true)
            ).toBe("");
            expect(
                validateDescription("", jest.fn(), true)
            ).toBe("");
        });
        it("should return error if not allowEmpty", () => {
            const func = jest.fn(() => "xxx");
            expect(
                validateDescription(undefined, func, false)
            ).toBe("xxx");
            expect(func).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: "secma-base.description.required"
                })
            );
        });
    });
    describe("short description", () => {
        it("should return error", () => {
            const func = jest.fn(() => "xxx");
            expect(
                validateDescription("a", func, false, 2)
            ).toBe("xxx");
            expect(func).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: "secma-base.description.short"
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
                validateDescription("abcd", func, false, 2, 3)
            ).toBe("xxx");
            expect(func).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: "secma-base.description.long"
                }), {
                    maxLength: 3
                }
            );
        });
    });
    describe("valid description", () => {
        it("should return empty", () => {
            expect(
                validateDescription("ac", jest.fn(), false, 2, 4)
            ).toBe("");
            expect(
                validateDescription("abc", jest.fn(), false, 2, 4)
            ).toBe("");
            expect(
                validateDescription("abcd", jest.fn(), false, 2, 4)
            ).toBe("");
        });
    });
});
