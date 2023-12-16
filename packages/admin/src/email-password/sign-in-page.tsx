import { SignInMuiForm } from '@secma/mui';
import { FC } from 'react';


/**
 * Properties expected by the {@link SignInPage}.
 */
export interface SignInPageProps {

}


/**
 * Renders the sign-in page, allowing the user to enter the credentials.
 *
 * When the user is signed in, the page redirects to the page set in the
 * navigation state or to the default page.
 */
export const SignInPage: FC<SignInPageProps> = () => {
    return (
        <SignInMuiForm />
    )
}

