import { DELETE_DISTRIBUTION } from "./constants";



export function deleteDistribution(token: string, id: string): Promise<void> {

    return fetch(`${DELETE_DISTRIBUTION}/${id}`, {
        method: 'DELETE', headers: {
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
