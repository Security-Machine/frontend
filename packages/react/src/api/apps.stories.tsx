import { useState } from 'react';
import type { StoryFn, Meta } from '@storybook/react';
import { JsonViewer } from '@textea/json-viewer';

import { SecMaContextProvider } from '../user-controller';
import {
    useAppList, useAppCreate, useAppDetails, useAppEdit, useAppDelete
} from "./apps";


// The properties passed to each story.
type StoryProps = {};


const ViewAppList = () => {
    const {
        trigger,
        reset,
        ...rest
    } = useAppList(false,); // autoTrigger
    return (
        <div>
            <h4>useAppList</h4>
            <button onClick={() => trigger()} type="button">Trigger</button>
            <button onClick={() => reset()} type="button">Reset</button>
            <JsonViewer value={rest} rootName="useAppList result" />
        </div>
    );
}

const ViewAppCreate = () => {
    const {
        trigger,
        reset,
        ...rest
    } = useAppCreate();
    return (
        <div>
            <h4>useAppCreate</h4>
            <button onClick={() => trigger()} type="button">Trigger</button>
            <button onClick={() => reset()} type="button">Reset</button>
            <JsonViewer value={rest} rootName="useAppCreate result" />
        </div>
    );
}

const ViewAppDetails = () => {
    const {
        trigger,
        reset,
        ...rest
    } = useAppDetails("details-app", false);
    return (
        <div>
            <h4>useAppDetails</h4>
            <button onClick={() => trigger()} type="button">Trigger</button>
            <button onClick={() => reset()} type="button">Reset</button>
            <JsonViewer value={rest} rootName="useAppDetails result" />
        </div>
    );
}

const ViewAppEdit = () => {
    const {
        trigger,
        reset,
        ...rest
    } = useAppEdit("edit-app");
    return (
        <div>
            <h4>useAppEdit</h4>
            <button onClick={() => trigger()} type="button">Trigger</button>
            <button onClick={() => reset()} type="button">Reset</button>
            <JsonViewer value={rest} rootName="useAppEdit result" />
        </div>
    );
}

const ViewAppDelete = () => {
    const {
        trigger,
        reset,
        ...rest
    } = useAppDelete("delete-app",); // appSlug
    return (
        <div>
            <h4>useAppDelete</h4>
            <button onClick={() => trigger()} type="button">Trigger</button>
            <button onClick={() => reset()} type="button">Reset</button>
            <JsonViewer value={rest} rootName="useAppDelete result" />
        </div>
    )
}


const Viewer = () => (
    <div>
        <hr />
        <ViewAppList />
        <hr />
        <ViewAppCreate />
        <hr />
        <ViewAppDetails />
        <hr />
        <ViewAppEdit />
        <hr />
        <ViewAppDelete />
        <hr />
    </div>
)

// The default application.
const defaultApp = {
    "slug": "lorem",
    "name": "ipsum",
    "description": "dolor",
    "created": "2023-01-01T01:02:03.000000Z",
    "updated": "2023-01-01T04:05:06.000000Z",
};


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'top-level/App Hooks',
    tags: [],
    component: Viewer,
    args: {},
    parameters: {
        fetchMock: {
            mocks: [
                {// list
                    matcher: {
                        url: "path:/mng/apps/",
                        method: 'GET',
                    },
                    response: ["lorem", "ipsum", "dolor"],
                    options: {
                        delay: 1000,
                    }
                },
                { // create
                    matcher: {
                        url: "path:/mng/apps/",
                        method: 'PUT',
                    },
                    response: defaultApp,
                },
                { // read
                    matcher: {
                        url: "path:/mng/apps/details-app",
                        method: 'GET',
                    },
                    response: defaultApp,
                },
                { // edit
                    matcher: {
                        url: "path:/mng/apps/edit-app",
                        method: 'POST',
                    },
                    response: defaultApp,
                },
                { // delete
                    matcher: {
                        url: "path:/mng/apps/delete-app",
                        method: 'DELETE',
                    },
                    response: defaultApp,
                }
            ]
        }
    }
};
export default storybookConfig;


// The type of the setter for the permissions.
type SetPermissions = (setter: (permissions: string[]) => string[]) => void;


// A single permission.
const Permission = ({
    permissions,
    setPermissions,
    me,
}: {
    permissions: string[],
    setPermissions: SetPermissions,
    me: string
}) => {
    return (
        <div>
            <input
                type="checkbox"
                checked={permissions.includes(me)}
                onChange={(e) => {
                    if (e.target.checked) {
                        setPermissions((permissions) => [...permissions, me]);
                    } else {
                        setPermissions((permissions) => permissions.filter(
                            p => p !== me
                        ));
                    }
                }}
            />
            <label>{me}</label>
        </div>
    )
}


// The list of editable permissions.
const Permissions = ({
    permissions,
    setPermissions,
}: {
    permissions: string[],
    setPermissions: SetPermissions,
}) => {
    return (
        <div>
            <h4>Permissions</h4>
            {["apps:r", "app:c", "app:r", "app:u", "app:d"].map((me) => (
                <Permission
                    key={me}
                    permissions={permissions}
                    setPermissions={setPermissions}
                    me={me}
                />
            ))}
        </div>
    )
}


// Base for all stories in this file.
const Template: StoryFn<StoryProps> = (args) => {
    const [permissions, setPermissions] = useState<string[]>([]);
    return (
        <>
            <Permissions
                permissions={permissions}
                setPermissions={setPermissions}
            />
            <SecMaContextProvider value={{
                signIn: (() => { }) as any,
                signOut: () => { },
                expires: 123545,
                permissions: permissions,
                user_name: "lorem",
            }}>
                <Viewer />
            </SecMaContextProvider>
        </>
    );
}


/**
 * The default story.
 */
export const Default: StoryFn<StoryProps> = Template.bind({});
