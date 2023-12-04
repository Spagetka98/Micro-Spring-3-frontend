//The basic api path
const BASE_API = '/api';

//The service name
const AUTH_SERVICE = '/auth';
const NEWS_SERVICE = '/news';

//Version
const VERSION_V1 = '/v1';

//Type of path -> public -> Does not require a logged in user
const PUBLIC = '/public';

//Controller path
const USER = '/user';
const REFRESH = '/refresh';
const PASSWORD = '/password';
const EMAIL = '/email';
const NEWS = '/news';

export const API_POST_LOGIN = BASE_API + AUTH_SERVICE + VERSION_V1 + PUBLIC + USER + '/login';
export const API_POST_REGISTRATION = BASE_API + AUTH_SERVICE + VERSION_V1 + PUBLIC + USER +'/registration';
export const API_GET_USER_DETAILS = BASE_API + AUTH_SERVICE + VERSION_V1 + USER;
export const API_GET_LOGOUT = BASE_API + AUTH_SERVICE + VERSION_V1 + USER + '/logout';

export const API_GET_REFRESH_JWT = BASE_API + AUTH_SERVICE + VERSION_V1 + PUBLIC + REFRESH + '/jwt';

export const API_POST_EMAIL_FORGOT = BASE_API + AUTH_SERVICE + VERSION_V1 + PUBLIC + PASSWORD + '/forgot';
export const API_POST_EMAIL_TOKEN_RESET = BASE_API + AUTH_SERVICE + VERSION_V1 + PUBLIC + PASSWORD + '/reset-token';
export const API_GET_EMAIL_CONFIRMATION = BASE_API + AUTH_SERVICE + VERSION_V1 + PUBLIC + EMAIL + '/confirmation';

export const API_GET_NEWS = BASE_API + NEWS_SERVICE + VERSION_V1 +  NEWS;
export const API_GET_NEWS_IMG = BASE_API + NEWS_SERVICE + VERSION_V1 +  NEWS + '/img';
export const API_DELETE_NEWS = BASE_API + NEWS_SERVICE + VERSION_V1 +  NEWS;
export const API_PUT_NEWS_ADD_LIKE = {
    START: BASE_API + NEWS_SERVICE + VERSION_V1 + NEWS + '/',
    END: '/add-like'
} 
export const API_PUT_NEWS_REMOVE_LIKE = {
    START: BASE_API + NEWS_SERVICE + VERSION_V1 + NEWS + '/',
    END: '/remove-like'
} 
export const API_PUT_NEWS_ADD_DISLIKE = {
    START: BASE_API + NEWS_SERVICE + VERSION_V1 + NEWS + '/',
    END: '/add-dislike'
} 
export const API_PUT_NEWS_REMOVE_DISLIKE = {
    START: BASE_API + NEWS_SERVICE + VERSION_V1 + NEWS + '/',
    END: '/remove-dislike'
} 
export const API_GET_NEWS_COMMENTS = {
    START: BASE_API + NEWS_SERVICE + VERSION_V1 + NEWS + '/',
    END: '/comment'
} 
