export const serverURL = "http://3.37.187.68:8000/";

export function getPKFromQuery(params) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(`${params}`);
}

export function setName(className, name) {
    const elements = document.querySelectorAll(`${className}`);
    elements.forEach(element => {
        element.innerText = name;
    });
}

export function setHref(className, href) {
    const elements = document.querySelectorAll(`a${className}`);
    elements.forEach(element => {
        element.setAttribute("href", href)
    })
}