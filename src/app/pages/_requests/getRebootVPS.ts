import { GET_REBOOT_VPS } from "./constants";

export function getRebootVPS(token: string, id: string): Promise<void> {

    return fetch(GET_REBOOT_VPS.replace(':id', id), {
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
