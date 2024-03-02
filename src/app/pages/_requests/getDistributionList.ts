import { GET_DISTRIBUTION_LIST } from "./constants";

export type DistributionModel = {
    id: number;
    name: string;
    logopath: string;
    created_at: string | null;
    updated_at: string | null;
}

export type DistributionListModel = { success: boolean, data: DistributionModel[] }

export function getDistributionList(token: string): Promise<DistributionListModel> {

    return fetch(GET_DISTRIBUTION_LIST, {
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
