//The basic api path
const BASE_API = '/api';

//Type of path -> public -> Does not require a logged in user
const PUBLIC = '/public';
const SECURED = '/secured';

//Controller path
const AUTH = '/auth';
const TOKEN = '/token';

export const LoginApi = BASE_API + PUBLIC + AUTH + '/login';
export const RegisterApi = BASE_API + PUBLIC + AUTH + '/register';
export const LogoutApi = BASE_API + PUBLIC + AUTH + '/logout';

export const RefreshJWTApi = BASE_API + PUBLIC + TOKEN + '/refreshJWT';
