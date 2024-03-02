import { POST_CREATE_CONFIG } from "./constants";

export type CreateConfigModel = {
    flavorId: string;
    name: string;
}


export function postCreateConfig(token: string, data: CreateConfigModel) {

    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
        formData.append(key, String(value));
    }


    return fetch(POST_CREATE_CONFIG, {
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
