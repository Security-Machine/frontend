import { SecMaUser, TokenContent } from "@secma/base";

/**
 * Information about the current user stored in context.
 */
export interface SecMaState extends SecMaUser {};


// Initial state of the controller.
export const initialUserState: SecMaState = {
    user_name: undefined,
    expires: 0,
    permissions: [],
};


/**
 * The action to sign the user in.
 *
 * Includes the actual token and the information decoded from it.
 */
export interface SignInAction {
    type: "sign-in";
    payload: TokenContent & { token: string; }
};


/**
 * The action for signing the user out.
 */
export interface ClearAction {
    type: "clear";
};


/**
 * All the actions supported by the reducer.
 */
export type SecMaUserAction = SignInAction | ClearAction;


export function secMaReducer(
    state: SecMaState, action: SecMaUserAction
): SecMaState {
    switch (action.type) {
        case "sign-in":
            return {
                ...state,
                user_name: action.payload.sub,
                expires: action.payload.exp,
                permissions: action.payload.scopes,
                token: action.payload.token,
            }
        case "clear":
            return initialUserState;
    }
}
