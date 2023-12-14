import { describe } from "node:test";
import { AccessPoint, AccessPointMethod } from "./base";
import { enableFetchMocks } from 'jest-fetch-mock'
import { IntlShape } from "react-intl";


enableFetchMocks();

// Instead of using the real translator.
const translator = {
    formatMessage: jest.fn(() => "a message" as any as string),
} as unknown as IntlShape;


beforeEach(() => {
    fetchMock.resetMocks();
    translator.formatMessage = jest.fn(() => "a message" as any as string);
})


describe("AccessPoint", () => {
    type Payload = { name: string };
    type TPath = { id: number, slug: string };
    type TResult = { id: number, name: string, slug: string };
    class ToTest extends AccessPoint<Payload, TPath, TResult> {
        get isMutation() { return true; }
        get method() { return "POST" as AccessPointMethod; }
        get pathPattern() { return "/api/{id}/{slug}"; }
    }

    describe("url", () => {
        it("should replace the placeholders", () => {
            const toTest = new ToTest();
            const result = toTest.url({ id: 1, slug: "test" });
            expect(result).toBe("/api/1/test");
        });
        it("should throw if a placeholder is missing", () => {
            const toTest = new ToTest();
            expect(() => toTest.url({ id: 1 } as any)).toThrow();
        });
        it("should return the path if no argument", () => {
            class ToTest2 extends AccessPoint<Payload, TPath, TResult> {
                get isMutation() { return true; }
                get method() { return "POST" as AccessPointMethod; }
                get pathPattern() { return "/api/1/2/3"; }
            }
            const toTest = new ToTest2();
            const result = toTest.url();
            expect(result).toBe("/api/1/2/3");
        });
    });

    describe("call", () => {
        it("should return the result", async () => {
            let processed: any;
            class ToTest2 extends ToTest {
                override processResult(result: any) {
                    processed = result;
                    return result.data;
                }
            }

            fetchMock.mockResponseOnce(JSON.stringify({ data: '12345' }));

            const toTest = new ToTest2();
            const result = await toTest.call(translator, {
                name: "test"
            }, {
                id: 1, slug: "test"
            });
            expect(result).toEqual('12345');
            expect(processed).toEqual({
                data: '12345'
            });
            expect(fetchMock.mock.calls.length).toEqual(1);
            expect(translator.formatMessage).not.toHaveBeenCalled();
        });
        it("should return an error on fetch error", async () => {
            fetchMock.mockReject(new Error('fake error message'));
            const toTest = new ToTest();
            const result = await toTest.call(translator, {
                name: "test"
            }, {
                id: 1, slug: "test"
            });
            expect(fetchMock.mock.calls.length).toEqual(1);
            expect(translator.formatMessage).toHaveBeenCalledWith({
                "defaultMessage": "Could not communicate with the server",
                "id": "secma-base.err-comm",
            });
        });
        it("should return an error if aborted", async () => {
            fetchMock.mockAbort();
            const toTest = new ToTest();
            const result = await toTest.call(translator, {
                name: "test"
            }, {
                id: 1, slug: "test"
            });
            expect(fetchMock.mock.calls.length).toEqual(1);
            expect(translator.formatMessage).toHaveBeenCalledWith({
                "defaultMessage": "Could not communicate with the server",
                "id": "secma-base.err-comm",
            });
        });
        it("should show error if response is not json", async () => {
            fetchMock.mockResponseOnce("not json");
            const toTest = new ToTest();
            const result = await toTest.call(translator, {
                name: "test"
            }, {
                id: 1, slug: "test"
            });
            expect(fetchMock.mock.calls.length).toEqual(1);
            expect(translator.formatMessage).not.toHaveBeenCalled();
            expect(result).toEqual({
                "code": "err-other",
                "message": "not json",
                "status": 200,
            });
        });
        it("should detect validation errors", async () => {
            fetchMock.mockResponseOnce(
                JSON.stringify({
                    "detail": [{
                        "loc": ["string", 0],
                        "msg": "string",
                        "type": "string"
                    }]
                }),
                { status: 422 }
            );
            const toTest = new ToTest();
            const result = await toTest.call(translator, {
                name: "test"
            }, {
                id: 1, slug: "test"
            });
            expect(fetchMock.mock.calls.length).toEqual(1);
            expect(translator.formatMessage).toHaveBeenCalledWith({
                "defaultMessage": "Validation error",
                "id": "secma-base.err-validation",
            });
            expect(result).toEqual({
                "code": "err-validation",
                "message": "a message",
                "status": 0,
            });
        });
        it("should detect API errors", async () => {
            fetchMock.mockResponseOnce(
                JSON.stringify({
                    "message": "abc",
                    "code": "def",
                    "field": "string",
                    "params": {
                        "lorem": "ipsum"
                    }
                }),
                { status: 500 }
            );
            const toTest = new ToTest();
            const result = await toTest.call(translator, {
                name: "test"
            }, {
                id: 1, slug: "test"
            });
            expect(fetchMock.mock.calls.length).toEqual(1);
            expect(translator.formatMessage).toHaveBeenCalledWith({
                "defaultMessage": "abc",
                "id": "secma-base.def",
            });
            expect(result).toEqual({
                "code": "def",
                "field": "string",
                "message": "a message",
                "params": {
                    "lorem": "ipsum"
                },
                "status": 500,
            });
        });
    });
});
