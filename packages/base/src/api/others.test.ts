import { enableFetchMocks } from "jest-fetch-mock";
import { StatsAP, VersionAP } from "./others";
import { SecMaUser } from "../user";
import { IntlShape } from "react-intl";

import { checkNoUser, checkNoPermission } from "./apps.test";


enableFetchMocks();


// User data for tests.
const testUser: SecMaUser = {
    permissions: [],
    user_name: undefined
} as any as SecMaUser;

// Instead of using the real translator.
const translator = {
    formatMessage: jest.fn(() => "a message" as any as string),
} as unknown as IntlShape;


beforeEach(() => {
    fetchMock.resetMocks();
    translator.formatMessage = jest.fn(() => "a message" as any as string);
    testUser.permissions = [];
    testUser.user_name = undefined;
})


describe("statistics", () => {
    class LocalStatsAP extends StatsAP {
        public constructor() { super(); }
    }
    let toTest: LocalStatsAP;
    const permissions = ["stats:r"];
    beforeEach(() => { toTest = new LocalStatsAP(); });

    it("should reject the call if the user is not logged in", async () => {
        await checkNoUser(toTest, permissions);
    });

    it("should reject the call if the user does not have perms", async () => {
        await checkNoPermission(toTest);
    });

    it("should call the API and return the result", async () => {
        testUser.permissions = permissions;
        testUser.user_name = "test";
        fetchMock.mockResponseOnce(
            JSON.stringify(["lorem", "ipsum"])
        );
        const result = await toTest.call(testUser, translator);
        expect(result).toEqual(["lorem", "ipsum"]);
        expect(fetchMock.mock.calls.length).toEqual(1);
        expect(translator.formatMessage).not.toHaveBeenCalled();
    });
});


describe("versions", () => {
    class LocalVersionAP extends VersionAP {
        public constructor() { super(); }
    }
    let toTest: LocalVersionAP;
    const permissions = ["version:r"];
    beforeEach(() => { toTest = new LocalVersionAP(); });

    it("should reject the call if the user is not logged in", async () => {
        await checkNoUser(toTest, permissions);
    });

    it("should reject the call if the user does not have perms", async () => {
        await checkNoPermission(toTest);
    });

    it("should call the API and return the result", async () => {
        testUser.permissions = permissions;
        testUser.user_name = "test";
        fetchMock.mockResponseOnce(
            JSON.stringify(["lorem", "ipsum"])
        );
        const result = await toTest.call(testUser, translator);
        expect(result).toEqual(["lorem", "ipsum"]);
        expect(fetchMock.mock.calls.length).toEqual(1);
        expect(translator.formatMessage).not.toHaveBeenCalled();
    });
});
