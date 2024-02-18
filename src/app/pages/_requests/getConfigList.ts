import { GET_CONFIG_LIST } from "./constants";

export type ConfigModel = {
    id: string;
    name: string;
    nameInStack: string;
    stackId: string;
    disk: string;
    ram: string;
    swap: string;
    vcpus: string;
    created_at: string | null;
    updated_at: string | null;
}

export type ConfigListModel = ConfigModel[]

export function getConfigList(token: string): Promise<ConfigListModel> {

    return fetch(GET_CONFIG_LIST, {
        method: 'GET', headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.api+json',
        },
    }).then(response => {
        return response.json()
    });
}
