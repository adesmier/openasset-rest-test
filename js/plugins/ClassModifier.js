;(function(window){

    function toggleClass(elementId, classToAdd){
        document.getElementById(elementId).classList.toggle(classToAdd);
    }

    let ClassModifier = {
        toggleClass: toggleClass
    }

    window.ClassModifier = ClassModifier;

})(window);