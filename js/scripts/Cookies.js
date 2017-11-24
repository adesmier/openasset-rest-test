
export default {
    checkCookie: function(){

    },
    
    setCookie: function(){

    },

    getCookie: function(cname){
        let name = cname + '=';
        let decodedCookie = decodeURIComponent(document.cookie); //handle special characters
        let splitCookies = decodedCookie.split(';');
        //search for cookie we want
        for(let i = 0; i < splitCookies.length; i++){
            let cookie = splitCookies[i];
        }
    }
}