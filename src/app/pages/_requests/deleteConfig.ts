import { DELETE_CONFIG } from "./constants";

export function deleteConfig(token: string, id: string): Promise<void> {

    return fetch(`${DELETE_CONFIG}/${id}`, {
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
