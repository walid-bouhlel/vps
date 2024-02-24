import { POST_CREATE_DISTRIBUTION } from "./constants";

export type CreateDistributionModel = {
    name: string;
    logopath: string;
}


export function postCreateDistribution(token: string, data: CreateDistributionModel) {

    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
        console.log(key, value)
        formData.append(key, String(value));
    }


    return fetch(POST_CREATE_DISTRIBUTION, {
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
