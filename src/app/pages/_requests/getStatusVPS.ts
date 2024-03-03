import { GET_STATUS_VPS } from "./constants";

type StatusModel = {
    success: boolean;
    status: string;
};

export function getStatusVPS(token: string, id: string): Promise<StatusModel> {

    return fetch(GET_STATUS_VPS.replace(':id', id), {
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
