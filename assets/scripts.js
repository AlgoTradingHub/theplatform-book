
let AccordionMenu = function (selector) {
    this.colMenu = document.querySelectorAll(`${selector} li`);
    let This = this;
    this.colMenu.forEach(function (items) {
        if (items.querySelector('ul')) {
            items.firstElementChild.insertAdjacentHTML('beforeend', '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 451.847 451.847" > <g> <path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751 c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0 c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"/> </g> </svg>');

            items.firstElementChild.onclick = function (e) {
                e.preventDefault();
                let animTimeout = e && e.isTrusted ? 350 : 0;

                let isTrue = this.parentElement.classList.toggle('open');

                if (isTrue) {
                    This.show(this.nextElementSibling, animTimeout);
                } else {
                    This.hide(this.nextElementSibling, animTimeout);
                }
            }
        }
    })
}

// Show an element
AccordionMenu.prototype.show = function (elem, timeout) {
    // Get the natural height of the element
    var getHeight = function () {
        elem.style.display = 'block'; // Make it visible
        var height = elem.scrollHeight + 'px'; // Get it's height
        return height;
    };

    var height = getHeight(); // Get the natural height
    elem.style.height = height; // Update the height

    setTimeout(function () {
        elem.style.height = 'auto';
    }, timeout);
};

// Hide an element
AccordionMenu.prototype.hide = function (elem) {
    // Give the element a height to change from
    elem.style.height = elem.scrollHeight + 'px';

    // Set the height back to 0
    setTimeout(function () {
        elem.style.height = '0';
    }, 110);

    setTimeout(function () {
        elem.style.display = '';
    }, 700);
};

function isVisible(el) {
    return el && el.style.display != 'none' && el.style.display != "";
}

function openParentSections(node) {
    if (node) {
        closestUl = node.closest("ul");
        if (closestUl) {
            closestLi = closestUl.closest("li");
            if (closestLi) {
                closestLi.firstElementChild.click();
                openParentSections(closestLi);
            }
        }
    }
}

function toggleMenuTransitions(node, transitionsEnabled) {
    if (transitionsEnabled) {
        node.classList.remove("notransition");
    } else {
        node.classList.add("notransition");
    }
}

function httpGetAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText)
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}

document.addEventListener("DOMContentLoaded", function (event) {
    let $ = document;
    let searchIcon = $.querySelector("#searchWrapper b");
    let searchWrapper = $.getElementById("searchField");
    let searchField = $.querySelector("#searchField input");
    let indexLinks = $.querySelectorAll("#indexContainer a");
    let contentContainer = $.querySelector("#content");

    function toggleSearch() {
        searchWrapper.style.display = isVisible(searchWrapper) ? 'none' : 'block';
        searchField.value = "";
        setTimeout(function () {
            if (isVisible(searchWrapper)) {
                searchField.focus();
            }
        }, 100);
    }

    searchIcon.addEventListener("click", function (event) {
        toggleSearch();
    });

    searchField.addEventListener("keyup", function (event) {
        let k = event.keyCode;
        if (k == 27) {
            toggleSearch();
        }
    });

    searchField.addEventListener("keydown", function (event) {
        let k = event.keyCode;
        if (k == 13) {
            httpGetAsync("/?q=" + searchField.value, function (content) {
                contentDocument.innerHTML = content;
                toggleSearch();
            });
        }
    });

    let currentPath = window.location.href;
    let currentActiveLink = null;
    indexLinks.forEach(
        i => {
            i.onclick = function (event) {
                event.preventDefault();
                const url = new URL(i.href);
                httpGetAsync("/?p=" + url.pathname, function (content) {
                    contentDocument.innerHTML = content;
                    Prism.highlightAll();
                    window.history.pushState(window.history.state, "", i.href);
                });
            }
            if (i.href == currentPath) {
                i.classList.add("active");
                currentActiveLink = i;
            }
        });

    new AccordionMenu('#accordion-menu');
    let menuContainer = $.getElementById('accordion-menu');

    toggleMenuTransitions(menuContainer, false);
    openParentSections(currentActiveLink);
    setTimeout(function () { toggleMenuTransitions(menuContainer, true) }, 100);

});
