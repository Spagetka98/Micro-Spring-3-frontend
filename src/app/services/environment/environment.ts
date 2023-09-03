const BASE_URL= "/api";

export enum AuthApiPath {
    Login = BASE_URL + '/public/auth/login',
    Register = BASE_URL + '/public/auth/register'
}

export enum UserApiPath {
    Logout = BASE_URL + '/secured/user/logout',
}