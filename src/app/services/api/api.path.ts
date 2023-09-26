//The basic api path
const BASE_API = '/api';

//Type of path -> public -> Does not require a logged in user
const PUBLIC = '/public';
const SECURED = '/secured';

//Controller path
const AUTH = '/auth';
const TOKEN = '/token';
const USER = "/user";
const PASSWORD = "/password";

export const LoginApi = BASE_API + PUBLIC + AUTH + '/login';
export const RegisterApi = BASE_API + PUBLIC + AUTH + '/register';

export const LogoutApi = BASE_API + SECURED + USER + '/logout';

export const RefreshJWTApi = BASE_API + PUBLIC + TOKEN + '/refreshJWT';

export const SendRefreshEmailApi = BASE_API + PUBLIC + PASSWORD + '/sendResetEmail';
export const ResetEmailApi = BASE_API + PUBLIC + PASSWORD + '/resetPasswordByToken';
