import { GET_FLAVOR_STACK } from "./constants";

export type FlavorDetails = {
    "disk": number; // Gb
    "ram": number; // Mb
    "swap": number; // Mb
    "vcpus": number;
}

export type FlavorStackModel = {
    id: string;
    name: string;
    flavorDetails: FlavorDetails;
}

export type FlavorStackListModel = FlavorStackModel[];

export function getFlavorStackList(token: string): Promise<FlavorStackListModel> {

    return fetch(GET_FLAVOR_STACK, {
        method: 'GET', headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.api+json',
        },
    }).then(response => {
        if (!response.ok) {
            throw 'Error'
        }
        return response.json()
    });
}
