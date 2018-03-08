
export default {
    
    setSessionData: function(name, obj, oaUrl){
        if(obj.data && obj.data.length > 0 && obj.headers){
            obj['oaUrl'] = oaUrl;
            window.localStorage.setItem(name, JSON.stringify(obj));
        } else {
            console.error(`The returned authentication JSON data is
                            invalid. Unable to save session`);
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
