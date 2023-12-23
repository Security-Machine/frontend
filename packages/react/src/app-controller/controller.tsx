import { FC, ReactNode, useMemo } from 'react';
import { SecMaAppContext, SecMaAppContextProvider } from './context';


/**
 * The properties expected by the {@link SecMaAppController}.
 */
export interface SecMaAppControllerProps extends SecMaAppContext {

    /**
     * The children rendered inside the controller.
     */
    children: ReactNode;
}


/**
 * General properties for the application.
 */
export const SecMaAppController: FC<SecMaAppControllerProps> = ({
    loginPath,
    apiUrl,
    adminPrefix = "/admin",
    children,
}) => {

    const value = useMemo(() => ({
        apiUrl,
        loginPath,
        adminPrefix,
    }), [
        apiUrl,
        loginPath,
        adminPrefix,
    ]);

    return (
        <SecMaAppContextProvider value={value}>
            {children}
        </SecMaAppContextProvider>
    )
}
