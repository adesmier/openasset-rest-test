
export default {

    setCookie: function(cname, key, expiry){
        document.cookie = `${cname}=${key}; path/; ${expiry}`;
    },

    getCookie: function(cnames){

        if(cnames.constructor === Array){
            let cookies = {};

            for(let i = 0; i < cnames.length; i++){
                let name = cnames[i] + '=';
                let decodedCookie = decodeURIComponent(document.cookie); //handle special characters
                let cookieArray = decodedCookie.split(';');

                for(let j = 0; j < cookieArray.length; j++){
                    let cookie = cookieArray[j];
                    
                    //remove spaces from beginning of cookie
                    while (cookie.charAt(0) == ' '){
                        cookie = cookie.substring(1);
                    }
                    if (cookie.indexOf(name) === 0) {
                        cookies[cnames[i]] = cookie.substring(name.length, cookie.length);
                        break;
                    } else {
                        cookies[cnames[i]] = false;
                    }
                }   
            }
            return cookies;

        } else {
            console.error('You need to pass an array to the getCookie function');
        }

    }

}