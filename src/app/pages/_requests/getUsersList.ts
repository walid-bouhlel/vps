import { GET_USER_LIST } from "./constants";

export type UserModel = {
    id: string;
    name: string;
    email: string;
    created_at: string;
    is_admin: 0 | 1;
};

export type UserListModel = { data: UserModel[] }

export function getUserList(token: string): Promise<UserListModel> {

    return fetch(GET_USER_LIST, {
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
