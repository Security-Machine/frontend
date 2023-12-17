import { IntlShape } from "react-intl";
import { enableFetchMocks } from "jest-fetch-mock";
import jwt_encode from "jwt-encode";

import { SecMaUser } from "../user";

import { checkNoUser, checkNoPermission } from "./apps.test";
import { LogInTokenAP } from "./token";

// User data for tests.
const testUser: SecMaUser = {
    permissions: [],
    user_name: undefined
} as any as SecMaUser;


enableFetchMocks();

// Instead of using the real translator.
const translator = {
    formatMessage: jest.fn(() => "a message" as any as string),
} as unknown as IntlShape;

class LocalTokenAP extends LogInTokenAP {
    public constructor() { super(); }
}
let toTest: LocalTokenAP;

beforeEach(() => {
    fetchMock.resetMocks();
    translator.formatMessage = jest.fn(() => "a message" as any as string);
    testUser.permissions = [];
    testUser.user_name = undefined;
    toTest = new LocalTokenAP();
});


it("should call the YYY API and return the result", async () => {
    expect(async () => {
        await toTest.call(testUser, translator);
    }).rejects.toThrow("Missing payload");
});


it("should call the XXX API and return the result", async () => {
    const tokenContent = {
        sub: "dolor",
        exp: "sit",
        scopes: "amet",
    }
    const tokenString = jwt_encode(tokenContent, "abcdef");
    fetchMock.mockResponseOnce(
        JSON.stringify({
            "access_token": tokenString,
            "token_type": "bearer"
        })
    );
    const result = await toTest.call(testUser, translator, {
        username: "test",
        password: "test",
    }, {
        app: "lorem",
        tenant: "ipsum",
    });
    expect(result).toEqual({
        ...tokenContent,
        "token": tokenString
    });
});
