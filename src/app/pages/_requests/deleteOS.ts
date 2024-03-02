import { DELETE_OS } from "./constants";



export function deleteOS(token: string, id: string): Promise<void> {

    return fetch(`${DELETE_OS}/${id}`, {
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
