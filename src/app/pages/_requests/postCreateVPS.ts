import { POST_CREATE_VPS } from "./constants";

export type CreateVPSModel = {
    imageId: string;
    flavorId: string;
    userId: number;
    description: string;
    instance: string;
    os_id: number;
    config_id: number
}


export function postCreateVPS(token: string, data: CreateVPSModel) {

    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
        formData.append(key, String(value));
    }


    return fetch(POST_CREATE_VPS, {
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
