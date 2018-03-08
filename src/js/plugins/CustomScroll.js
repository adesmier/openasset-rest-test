;(function(window){

    function toElement(elementId, behavior = 'auto',
                             block = 'center', inline = 'nearest'){
        let element = document.getElementById(elementId);
        let options = {
            behavior: behavior,
            block: block,
            inline: inline
        };

        setTimeout(function(){
            element.scrollIntoView(options);
        }, 1000);
    }

    let CustomScroll = {
        toElement: toElement
    }

    window.CustomScroll = CustomScroll;

})(window);