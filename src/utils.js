export const cookieByName = function (name) {
    let match = document.cookie.match(new RegExp(name + '=([^;]+)'));
    if (match) return match[1];
    return null;
}
export const setCookie = function (name, value, hours) {
    let dateObj = new Date();
    dateObj.setTime(dateObj.getTime() + (hours*60*60*1000));
    document.cookie = name + "=" + value + ";expires="+ dateObj.toUTCString()
}