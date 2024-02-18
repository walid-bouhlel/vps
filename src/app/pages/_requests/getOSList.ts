import { GET_OS_LIST } from "./constants";

export type OSModel = {
    id: number;
    name: string;
    nameInStack: string;
    idInStack: string;
    distribution_id: number;
    version: string;
    created_at: string | null;
    updated_at: string | null;
}

export type OSModelList = OSModel[]

export function getOSList(token: string): Promise<OSModelList> {

    return fetch(GET_OS_LIST, {
        method: 'GET', headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.api+json',
        },
    }).then(response => {
        return response.json()
    });
}
