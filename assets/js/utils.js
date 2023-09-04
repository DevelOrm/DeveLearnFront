export const serverURL = "http://52.79.53.117/";

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

export function dateFormatting(data) {
  const time = new Date(data.updated_at.split('.')[0])
  const year = time.getFullYear()
  const month = String(time.getMonth() + 1).padStart(2, '0')
  const day = String(time.getDate()).padStart(2, '0')
  const formattedDate = `${year}/${month}/${day}`
  return formattedDate
}
