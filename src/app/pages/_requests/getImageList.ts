import { GET_IMAGE_LIST } from "./constants";

export type ImageModel = {
    id: string;
    name: string;
}

export type ImageListModel = ImageModel[]

export function getImageList(token: string): Promise<ImageListModel> {

    return fetch(GET_IMAGE_LIST, {
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
