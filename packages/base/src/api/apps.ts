
export interface AccessPoint {
    /**
     * The path toward the access point.
     */
    url: string;

    /**
     * The method used to call the access point.
     */
    method: "GET" | "POST" | "PUT" | "DELETE";

}


export const appListAP: AccessPoint = {
    url: "/api/apps",
    method: "GET"
};


export const appDetailAP: AccessPoint = {
    url: "/api/apps/:id",
    method: "GET"
};


export function fetchApplications() {
    return fetch('/api/apps').then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Failed to fetch applications');
    });
}
