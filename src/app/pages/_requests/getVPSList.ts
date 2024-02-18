import { GET_VPS_LIST } from "./constants";

export type VPSModel = {
    id: number;
    instance: string;
    server_name: string;
    description: string;
    ipv4: string;
    os_id: number;
    config_id: number;
}

export type VPSListModel = { data: VPSModel[] }

export function getVPSList(token: string): Promise<VPSListModel> {

    return fetch(GET_VPS_LIST, {
        method: 'GET', headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.api+json',
        },
    }).then(response => {
        return response.json()
    });
}
