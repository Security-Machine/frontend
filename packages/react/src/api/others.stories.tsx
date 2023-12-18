import type { StoryFn, Meta } from '@storybook/react';

import { JsonViewer } from '@textea/json-viewer';

import { useStats, useVersion } from "./others";
import { useState } from 'react';
import { SecMaContextProvider } from '../user-controller';
import { SecMaAppContextProvider } from '../app-controller';


// The properties passed to each story.
type StoryProps = {};


const ViewServerStats = () => {
    const {
        trigger,
        reset,
        ...rest
    } = useStats(false,); // autoTrigger
    return (
        <div>
            <h4>useStats</h4>
            <button onClick={() => trigger()} type="button">Trigger</button>
            <button onClick={() => reset()} type="button">Reset</button>
            <JsonViewer value={rest} rootName="useStats result" />
        </div>
    );
}


const ViewServerVersion = () => {
    const {
        trigger,
        reset,
        ...rest
    } = useVersion(false,); // autoTrigger
    return (
        <div>
            <h4>useVersion</h4>
            <button onClick={() => trigger()} type="button">Trigger</button>
            <button onClick={() => reset()} type="button">Reset</button>
            <JsonViewer value={rest} rootName="useVersion result" />
        </div>
    );
}


const Viewer = () => (
    <div>
        <hr />
        <ViewServerStats />
        <hr />
        <ViewServerVersion />
        <hr />
    </div>
)



// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'top-level/Other Hooks',
    tags: [],
    component: Viewer,
    args: {},
    parameters: {
        fetchMock: {
            mocks: [
                {// stats
                    matcher: {
                        url: "path:/mng/stats",
                        method: 'GET',
                    },
                    response: { "lorem": "ipsum" },
                    options: {
                        delay: 1000,
                    }
                },
                {// stats
                    matcher: {
                        url: "path:/mng/version",
                        method: 'GET',
                    },
                    response: { "lorem": "ipsum" },
                    options: {
                        delay: 1000,
                    }
                },
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
            {["stats:r", "version:r"].map((me) => (
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
