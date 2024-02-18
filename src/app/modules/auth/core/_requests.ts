import { AuthModel, UserModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/api/check`;
export const LOGIN_URL = `${API_URL}/api/login`;
export const REGISTER_URL = `${API_URL}/api/register`;
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`;

// Server should return AuthModel
export function login(email: string, password: string): Promise<AuthModel> {

  const formData = new FormData();

  formData.append('email', email);
  formData.append('password', password);


  return fetch(LOGIN_URL, {
    method: 'POST', body: formData, headers: {
      'Accept': 'application/vnd.api+json',
    }
  }).then(response => {
    return response.json()
  });
}

// Server should return AuthModel
export function register(
  email: string,
  name: string,
  password: string,
  password_confirmation: string
): Promise<AuthModel> {

  const formData = new FormData();

  formData.append('name', name);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('password_confirmation', password_confirmation);

  return fetch(REGISTER_URL, {
    method: 'POST', body: formData, headers: {
      'Accept': 'application/vnd.api+json',
    }
  }).then(response => {
    return response.json()
  });
}

export function requestPassword(email: string) {
  return null;
}

export function getUserByToken(token: string): Promise<AuthModel> {

  return fetch(GET_USER_BY_ACCESSTOKEN_URL, {
    method: 'GET', headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.api+json',
    },
  }).then(response => {
    return response.json()
  });
}
