import { enableFetchMocks } from "jest-fetch-mock";
import { IntlShape } from "react-intl";
import { DateTime } from "luxon";

import { SecMaUser } from "../user";
import { ApplicationData } from "../models/apps";
import {
    AppListAP,
    AppDetailsAP,
    AppCreateAP,
    AppEditAP,
    AppDeleteAP
} from "./apps";


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

// The response payload for functions that return an application.
const appDataPayload = JSON.stringify({
    slug: "x", title: "y", description: "z",
    created: "2020-01-01T01:02:03.000Z",
    updated: "2020-01-01T04:05:06.000Z"
})


beforeEach(() => {
    fetchMock.resetMocks();
    translator.formatMessage = jest.fn(() => "a message" as any as string);
    testUser.permissions = [];
    testUser.user_name = undefined;
})


export async function checkNoUser(toTest: any, permissions: string[]) {
    testUser.permissions = permissions;
    const result = await toTest.call(testUser, translator);
    expect(result).toEqual({
        "code": "err-permission",
        "message": "a message",
        "status": 0
    });
    expect(fetchMock.mock.calls.length).toEqual(0);
    expect(translator.formatMessage).toHaveBeenCalledWith({
        "defaultMessage":
            "You don't have the required permissions to access " +
            "this resource",
        "id": "secma-base.err-permission",
    });
}


export async function checkNoPermission(toTest: any) {
    testUser.permissions = ["apps:xxx", "apps:yyy"];
    testUser.user_name = "test";
    const result = await toTest.call(testUser, translator);
    expect(result).toEqual({
        "code": "err-permission",
        "message": "a message",
        "status": 0
    });
    expect(fetchMock.mock.calls.length).toEqual(0);
    expect(translator.formatMessage).toHaveBeenCalledWith({
        "defaultMessage":
            "You don't have the required permissions to access " +
            "this resource",
        "id": "secma-base.err-permission",
    });
}


function checkDataPayload(result: ApplicationData) {
    expect(result.slug).toEqual("x");
    expect(result.title).toEqual("y");
    expect(result.description).toEqual("z");
    expect(result.created).toBeInstanceOf(DateTime);
    expect(result.updated).toBeInstanceOf(DateTime);

    expect(result.created.toISODate()).toEqual("2020-01-01");
    expect(result.created.minute).toEqual(2);
    expect(result.updated.toISODate()).toEqual("2020-01-01");
    expect(result.updated.minute).toEqual(5);

    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(translator.formatMessage).not.toHaveBeenCalled();
}


describe("list", () => {
    class LocalAppListAP extends AppListAP {
        public constructor() { super(); }
    }
    let toTest: LocalAppListAP;
    const permissions = ["apps:r"];
    beforeEach(() => { toTest = new LocalAppListAP(); });

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


describe("create", () => {
    class LocalAppCreateAP extends AppCreateAP {
        public constructor() { super(); }
    }
    let toTest: LocalAppCreateAP;
    const permissions = ["app:c"];
    beforeEach(() => { toTest = new LocalAppCreateAP(); });

    it("should reject the call if the user is not logged in", async () => {
        await checkNoUser(toTest, permissions);
    });

    it("should reject the call if the user does not have perms", async () => {
        await checkNoPermission(toTest);
    });

    it("should call the API and return the result", async () => {
        testUser.permissions = permissions;
        testUser.user_name = "test";
        fetchMock.mockResponseOnce(appDataPayload);
        const result = await toTest.call(testUser, translator, {
            slug: "lorem",
            title: "ipsum",
            description: "dolor"
        }) as ApplicationData;

        expect(fetchMock.mock.calls[0][0]).toEqual("auth123/mng/apps/");
        checkDataPayload(result);
    });
});


describe("read", () => {
    class LocalAppDetailsAP extends AppDetailsAP {
        public constructor() { super(); }
    }
    let toTest: LocalAppDetailsAP;
    const permissions = ["app:r"];
    beforeEach(() => { toTest = new LocalAppDetailsAP(); });

    it("should reject the call if the user is not logged in", async () => {
        await checkNoUser(toTest, permissions);
    });

    it("should reject the call if the user does not have perms", async () => {
        await checkNoPermission(toTest);
    });

    it("should call the API and return the result", async () => {
        testUser.permissions = permissions;
        testUser.user_name = "test";
        fetchMock.mockResponseOnce(appDataPayload);
        const result = await toTest.call(
            testUser, translator, undefined, { slug: "lorem" }
        ) as ApplicationData;

        expect(fetchMock.mock.calls[0][0]).toEqual("auth123/mng/apps/lorem");
        checkDataPayload(result);
    });
});


describe("update", () => {
    class LocalAppEditAP extends AppEditAP {
        public constructor() { super(); }
    }
    let toTest: LocalAppEditAP;
    const permissions = ["app:u"];
    beforeEach(() => { toTest = new LocalAppEditAP(); });

    it("should reject the call if the user is not logged in", async () => {
        await checkNoUser(toTest, permissions);
    });

    it("should reject the call if the user does not have perms", async () => {
        await checkNoPermission(toTest);
    });

    it("should call the API and return the result", async () => {
        testUser.permissions = permissions;
        testUser.user_name = "test";
        fetchMock.mockResponseOnce(appDataPayload);
        const result = await toTest.call(
            testUser, translator, {
                slug: "lorem",
                title: "ipsum",
                description: "dolor"
            }, { slug: "lorem" }
        ) as ApplicationData;

        expect(fetchMock.mock.calls[0][0]).toEqual("auth123/mng/apps/lorem");
        checkDataPayload(result);
    });
});


describe("delete", () => {
    class LocalAppDeleteAP extends AppDeleteAP {
        public constructor() { super(); }
    }
    let toTest: LocalAppDeleteAP;
    const permissions = ["app:d"];
    beforeEach(() => { toTest = new LocalAppDeleteAP(); });

    it("should reject the call if the user is not logged in", async () => {
        await checkNoUser(toTest, permissions);
    });

    it("should reject the call if the user does not have perms", async () => {
        await checkNoPermission(toTest);
    });

    it("should call the API and return the result", async () => {
        testUser.permissions = permissions;
        testUser.user_name = "test";
        fetchMock.mockResponseOnce(appDataPayload);
        const result = await toTest.call(
            testUser, translator, undefined, { slug: "lorem" }
        ) as ApplicationData;

        expect(fetchMock.mock.calls[0][0]).toEqual("auth123/mng/apps/lorem");
        checkDataPayload(result);
    });
});
