import { FC, ReactNode } from 'react';
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
    children,
}) => {
    return (
        <SecMaAppContextProvider value={{
            loginPath
        }}>
            {children}
        </SecMaAppContextProvider>
    )
}
