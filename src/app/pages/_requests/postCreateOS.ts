import { POST_CREATE_OS } from "./constants";

export type CreateOSModel = {
    imageId: string;
    name: string;
    version: string;
    distribution_id: number;
}


export function postCreateOS(token: string, data: CreateOSModel) {

    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
        formData.append(key, String(value));
    }


    return fetch(POST_CREATE_OS, {
        method: 'POST', headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.api+json',
        },
        body: formData
    }).then(async (response) => {
        if (!response.ok) {
            throw await response.json() ?? 'Error'
        }
        return response.json()
    });
}
