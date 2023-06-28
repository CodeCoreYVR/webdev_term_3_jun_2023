const getCookieValue = (cookieName) => {
    const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${cookieName}=`))
        ?.split("=")[1];
    return cookieValue || "";
}

const removeCookie = (name, path, domain) => {
    if (getCookieValue(name)) {
        document.cookie = name + "=" +
            ((path) ? ";path=" + path : "") +
            ((domain) ? ";domain=" + domain : "") +
            ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
}

export { removeCookie, getCookieValue }