import { GET_VPS_LIST } from "./constants";

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
        console.log(key, value)
        formData.append(key, String(value));
    }


    return fetch(GET_VPS_LIST, {
        method: 'POST', headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.api+json',
        },
        body: formData
    }).then(response => {
        if (!response.ok) {
            throw 'Error'
        }
        return response.json()
    });
}
