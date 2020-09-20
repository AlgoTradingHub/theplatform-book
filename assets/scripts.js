function isVisible(el){
    return el && el.style.display != 'none' && el.style.display != "";
}

document.addEventListener("DOMContentLoaded", function(event) { 
    let $ = document;
    let searchIcon = $.querySelector("#searchWrapper b");
    let searchWrapper = $.getElementById("searchField");
    let searchField = $.querySelector("#searchField input");
    let indexLinks = $.querySelectorAll("#indexContainer a");
    
    function toggleSearch(){
        searchWrapper.style.display = isVisible(searchWrapper) ? 'none' : 'block';
        searchField.value = "";
        setTimeout(function(){
            if (isVisible(searchWrapper)){
                searchField.focus();
            }
        },100);
    }

    searchIcon.addEventListener("click",function(event){
        toggleSearch();
    });

    searchField.addEventListener("keyup",function(event){
        let k = event.keyCode;
        if (k == 27){
            toggleSearch();
        }
    });

    let currentPath = window.location.href;
    indexLinks.forEach(i => {if (i.href == currentPath) {i.classList.add("active"); i.scrollIntoView()}});
});