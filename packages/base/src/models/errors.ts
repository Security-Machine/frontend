
/**
 * The error object returned by the API.
 */
export interface AccessPointError {
    /**
     * The HTTP status code.
     */
    status: number;

    /**
     * A human-readable message.
     */
    message: string;

    /**
     * The code that can be used to generate the message.
     *
     * @see useAllErrorMessages for possible codes.
     */
    code?: string;

    /**
     * The field that caused the error, if any.
     */
    field?: string;

    /**
     * Additional parameters for the message.
     */
    params?: Record<string, any>;
}
