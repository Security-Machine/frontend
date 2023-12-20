import { validateSlug } from "./slug";

describe("validateSlug", () => {
    it("should return error if no slug", () => {
        const func = jest.fn(() => "xxx");
        expect(
            validateSlug(undefined, func)
        ).toBe("xxx");
        expect(func).toHaveBeenCalledWith(
            expect.objectContaining({
                id: "secma-base.slug.required"
            })
        );
        const func2 = jest.fn(() => "yyy");
        expect(
            validateSlug("", func2)
        ).toBe("yyy");
        expect(func2).toHaveBeenCalledWith(
            expect.objectContaining({
                id: "secma-base.slug.required"
            })
        );
    });
    it("should return error if slug too short", () => {
        const func = jest.fn(() => "xxx");
        expect(
            validateSlug("a", func)
        ).toBe("xxx");
        expect(func).toHaveBeenCalledWith(
            expect.objectContaining({
                id: "secma-base.slug.short"
            })
        );
    });
    it("should return error if slug too long", () => {
        const func = jest.fn(() => "xxx");
        const longString = "a".repeat(256);
        expect(
            validateSlug(longString, func)
        ).toBe("xxx");
        expect(func).toHaveBeenCalledWith(
            expect.objectContaining({
                id: "secma-base.slug.long"
            })
        );
    });
    it("should return error if slug invalid", () => {
        const func = jest.fn(() => "xxx");
        expect(
            validateSlug("a b", func)
        ).toBe("xxx");
        expect(func).toHaveBeenCalledWith(
            expect.objectContaining({
                id: "secma-base.slug.invalid"
            })
        );
    });
    it("should return empty if valid slug", () => {
        expect(
            validateSlug("abc", jest.fn())
        ).toBe("");
        expect(
            validateSlug("abc-def", jest.fn())
        ).toBe("");
        expect(
            validateSlug("abc-def-ghi", jest.fn())
        ).toBe("");
    });
});
