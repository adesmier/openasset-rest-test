
export default {
    
        setSessionData: function(name, obj, oaUrl){
            if(obj.data && obj.data.length > 0 && obj.headers){
                obj['oaUrl'] = oaUrl;
                window.localStorage.setItem(name, JSON.stringify(obj));
            } else {
                console.error('The returned authentication JSON data is invalid');
            }
        },
    
        getSessionData: function(name){
            if(!window.localStorage.getItem(name)){
                return false;
            } else {
                let sessionData = JSON.parse(window.localStorage.getItem(name));
                return sessionData;
            }
        }

    }





// export default {

//     setCookie: function(cname, key, expiry){
//         document.cookie = `${cname}=${key}; path/; ${expiry}`;
//     },

//     getCookie: function(cnames){

//         if(cnames.constructor === Array){
//             let cookies = {};

//             for(let i = 0; i < cnames.length; i++){
//                 let name = cnames[i] + '=';
//                 let decodedCookie = decodeURIComponent(document.cookie); //handle special characters
//                 let cookieArray = decodedCookie.split(';');

//                 for(let j = 0; j < cookieArray.length; j++){
//                     let cookie = cookieArray[j];
                    
//                     //remove spaces from beginning of cookie
//                     while (cookie.charAt(0) == ' '){
//                         cookie = cookie.substring(1);
//                     }
//                     if (cookie.indexOf(name) === 0) {
//                         //create obj key as cookie name
//                         cookies[cnames[i]] = cookie.substring(name.length, cookie.length);
//                         break;
//                     } else {
//                         cookies[cnames[i]] = false;
//                     }
//                 }   
//             }
//             return cookies;

//         } else {
//             console.error('You need to pass an array to the getCookie function');
//         }

//     }

// }