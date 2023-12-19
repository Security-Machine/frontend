import type { StoryFn, Meta } from '@storybook/react';

import { Use2StageListProps, use2StageList } from './use-list';
import { SecMaContextProvider } from '../user-controller';
import { useEffect, useState } from 'react';


// The type of the element in the initial query.
type TFast = string;

// The type of the element in the detail query.
interface TDetail {
    title: string;
    details: string;
}


// The properties passed to each story.
type StoryProps = Use2StageListProps<
    never, never, TFast,
    never, { unique: TFast; }, TDetail
> & {
    user_name?: string;
};

// Story data.
const storyData: Record<TFast, TDetail> = {
    "lorem": {
        title: "ipsum",
        details: "dolor",
    },
    "sit": {
        title: "amet",
        details: "consectetur",
    },
    "adipiscing": {
        title: "elit",
        details: "sed",
    },
    "do": {
        title: "eiusmod",
        details: "tempor",
    },
};

function delay(t: number) {
    return new Promise(resolve => setTimeout(resolve, t));
}

// The hook for initial fetch.
const useFetchList = () => {
    const [data, setData] = useState<any>({
        result: undefined,
        loading: true,
        error: undefined,
        trigger: (() => { }) as any,
        reset: () => { },
    });

    useEffect(() => {
        delay(1000).then(() => setData({
            result: Object.keys(storyData),
            loading: false,
            error: undefined,
            trigger: (() => { }) as any,
            reset: () => { },
        }));
    }, []);

    return data
};

// The hook for detail fetch.
const fetchDetail = async (unique: TFast) => {
    await delay(2000);
    return storyData[unique];
};

// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'CRUD/use2StageList',
    tags: [],
    args: {
        user_name: "lorem",
        createPerms: ["perm:c"],
        readPerms: ["perm:r"],
        updatePerms: ["perm:u"],
        deletePerms: ["perm:d"],
        useFetchList: useFetchList as any,
        fetchDetail: fetchDetail as any,
        toKey: (fast: TFast) => fast,
    },
    parameters: {
        fetchMock: {
            mocks: [

            ]
        }
    }
};
export default storybookConfig;


// Tell if a capability is allowed and which are the permissions required.
const Value = ({ on, lst = [] }: { on: boolean, lst?: string[] }) => (
    <td>{(on ? "✅" : "❌") + lst.join()}</td>
)

// Pick information from context.
const Inner = (args: any) => {
    const {
        canCreate,
        canRead,
        canUpdate,
        canDelete,
        beginEdit,
        beginDelete,
        setCurrent,
        clearCurrent,
        isListLoading,
        errorInList,
        reloadList,
        resetList,
        data,
        current,
        mode,
    } = use2StageList<
        never, never, TFast,
        never, { unique: TFast; }, TDetail
    >(args);
    return (
        <table>
            <caption>
                use2StageList
            </caption>
            <tbody>
                <tr>
                    <th>canCreate</th>
                    <Value on={canCreate} lst={args.createPerms} />
                </tr>
                <tr>
                    <th>canRead</th>
                    <Value on={canRead} lst={args.readPerms} />
                </tr>
                <tr>
                    <th>canUpdate</th>
                    <Value on={canUpdate} lst={args.updatePerms} />
                </tr>
                <tr>
                    <th>canDelete</th>
                    <Value on={canDelete} lst={args.deletePerms} />
                </tr>
                <tr>
                    <th>isListLoading</th>
                    <Value on={isListLoading} />
                </tr>
                <tr>
                    <th>errorInList</th>
                    <td>{errorInList ? errorInList.message : null}</td>
                </tr>
                <tr>
                    <th>current</th>
                    <td>{current}</td>
                </tr>
                <tr>
                    <th>mode</th>
                    <td>{mode}</td>
                </tr>
                <tr>
                    <th colSpan={2}><hr /></th>
                </tr>
                {
                    Object.keys(data).map(key => (
                        <tr key={key}>
                            <td>{key}</td>
                            <td>{
                                typeof data[key] === "string"
                                    ? (data[key] as string)
                                    : (data[key] as TDetail).title
                            }</td>
                        </tr>
                    ))
                }
            </tbody>
            <tfoot>
                <tr>
                    <th colSpan={2}><hr /></th>
                </tr>
                <tr>
                    <th colSpan={2}>
                        <button onClick={() => reloadList()}>
                            Reload list
                        </button>
                        <button onClick={() => resetList()}>
                            Reset list
                        </button>
                        <button onClick={() => beginEdit(
                            Object.keys(storyData)[0]
                        )}>
                            Begin edit
                        </button>
                        <button onClick={() => beginDelete(
                            Object.keys(storyData)[1]
                        )}>
                            Begin delete
                        </button>
                        <button onClick={() => setCurrent(
                            Object.keys(storyData)[2]
                        )}>
                            Set current
                        </button>
                        <button onClick={() => clearCurrent()}>
                            Clear current
                        </button>
                    </th>
                </tr>
            </tfoot>
        </table>
    );
}


// Base for all stories in this file.
const Template: StoryFn<StoryProps> = ({ user_name, ...rest }) => {
    return (
        <SecMaContextProvider value={{
            signIn: (() => { }) as any,
            signOut: () => { },
            user_name,
            expires: 0,
            permissions: ["perm:c", "perm:r", "perm:u", "perm:d"],
            token: "token"
        }}>
            <Inner {...rest} />
        </SecMaContextProvider>
    );
}


/**
 * The default story. All permissions are allowed.
 */
export const AllAllowed: StoryFn<StoryProps> = Template.bind({});
AllAllowed.args = {};


/**
 * The user is signed in but does not have the required permissions.
 */
export const NoneAllowed: StoryFn<StoryProps> = Template.bind({});
NoneAllowed.args = {
    createPerms: ["perm:x"],
    readPerms: ["perm:x"],
    updatePerms: ["perm:x"],
    deletePerms: ["perm:x"],
};


/**
 * The user is not signed in.
 */
export const NotSignedIn: StoryFn<StoryProps> = Template.bind({});
NotSignedIn.args = {
    user_name: undefined,
};
