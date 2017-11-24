import axios from 'axios';

import {BASE_NOUN} from './Constants';


export default {
    authenticate: function(oaUrl, username, password){
        //let headers = { headers: { Authorization : 'Bearer ' + authToken } };
        let baseUrl = oaUrl + BASE_NOUN;
        let authUserUrl = `Users?username=${username}`;
        let fullUrl = baseUrl + authUserUrl;

        let config = {
            method: 'get',
            headers: {
                'X-SessionKey': 'AD274A2451823DBF006FB00A5485033C'
            },
            // auth: {
            //     username: username,
            //     password: password
            // }
        };

        console.log('full url is ' + fullUrl);

        return axios.get(fullUrl, config).then(response => {
            console.log('in auth');
            return response
        }).catch(error => {
            console.log('in error');
            return error
        });

   }
}