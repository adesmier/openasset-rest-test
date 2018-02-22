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
        { TITLE: 'First Ten Projects', URL: 'Projects/' },
        { TITLE: 'First Twenty Projects', URL: 'Projects?limit=20' }
    ],
    FILES: [
        { TITLE: 'First Ten Files', URL: 'Files/' },
        { TITLE: 'First Twenty Files', URL: 'Files?limit=20' }
    ],
    KEYWORDS: [
        { TITLE: 'First Ten Keywords', URL: 'Keywords/' },
        { TITLE: 'First Twenty Keywords', URL: 'Keywords?limit=20' }
    ],
    ALBUMS: [
        { TITLE: 'First Ten Albums', URL: 'Albums/' },
        { TITLE: 'First Twenty Albums', URL: 'Albums?limit=20' }
    ]
};

//FLUX ACTION TYPES
export const FLUX_ACTIONS = {
    UPDATE_SESSION: 'UPDATE_SESSION',
    UPDATE_APICALL: 'UPDATE_APICALL',
    UPDATE_API_ENDPOINT: 'UPDATE_API_ENDPOINT',
    UPDATE_API_ENDPOINT_URL: 'UPDATE_API_ENDPOINT_URL'
}
