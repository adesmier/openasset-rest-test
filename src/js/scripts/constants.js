export const BASE_REST_URL = '/REST/1/'
export const OA_LOCAL_STORE_NAME = 'openassetapikey'
export const OA_API_ENDPOINTS = [
    'Projects',
    'Files',
    'Keywords',
    'Albums',
];

//COMMON API CALL
export const COMMON_CALLS = {
    PROJECTS: [
        { TITLE: 'First Ten Projects', URL: '' },
        { TITLE: 'First Twenty Projects', URL: '?limit=20' }
    ],
    FILES: [
        { TITLE: 'First Ten Files', URL: '' },
        { TITLE: 'First Twenty Files', URL: '?limit=20' }
    ],
    KEYWORDS: [
        { TITLE: 'First Ten Keywords', URL: '' },
        { TITLE: 'First Twenty Keywords', URL: '?limit=20' }
    ],
    ALBUMS: [
        { TITLE: 'First Ten Albums', URL: '' },
        { TITLE: 'First Twenty Albums', URL: '?limit=20' }
    ]
};

//REDUX ACTION TYPES
export const REDUX_ACTIONS = {
    SESSION_STILL_VALID: 'SESSION_STILL_VALID',
    SESSION_NOT_VALID: 'SESSION_NOT_VALID',
    LOGIN_PENDING: 'LOGIN_PENDING',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILED: 'LOGIN_FAILED',
    UPDATE_QUERY: 'UPDATE_QUERY',
    ADD_PARAMETER: 'ADD_PARAMETER'
}
