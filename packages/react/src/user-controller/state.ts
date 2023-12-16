import { SecMaUser, TokenData } from "@secma/base";

/**
 * Information about the current user stored in context.
 */
export interface SecMaState extends SecMaUser {};


// Initial state of the controller.
export const initialUserState: SecMaState = {
    /**
     * The name of the user that is logged in or undefined if no user is
     * logged in.
     */
    user_name: undefined,

    /**
     * The time when the token expires.
     */
    expires: 0,

    /**
     * The permissions the user has.
     */
    permissions: [],

    /**
     * The token that was used to sign the user in.
     */
    token: undefined,
};


/**
 * The action to sign the user in.
 *
 * Includes the actual token and the information decoded from it.
 */
export interface SignInAction {
    type: "sign-in";
    payload: TokenData
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


/**
 * The reducer for the {@link SecMaController} component.
 */
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
        default:
            return state;
    }
}
