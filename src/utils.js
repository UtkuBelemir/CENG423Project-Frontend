export const cookieByName = function (name) {
    let match = document.cookie.match(new RegExp(name + '=([^;]+)'));
    if (match) return match[1];
    return null;
}
export const setCookie = function (name, value, hours) {
    let dateObj = new Date();
    dateObj.setTime(dateObj.getTime() + (hours * 60 * 60 * 1000));
    document.cookie = name + "=" + value + ";expires=" + dateObj.toUTCString()
}
export function removeCookie( name ) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
export const categories = {
    "buy-sell": [
        {value: "furniture", label: 'Furniture'},
        {value: "electronics", label: 'Electronics'},
        {value: "fashion", label: 'Fashion'},
        {value: "book", label: 'Book'}
    ],
    "roommate": [
        {value: "house", label: "Full House"},
        {value: "room", label: "Private Room"}
    ]
}
export const findCategory = (category, type) => {
    let tempCategory = categories[type].find((i1) => i1.value == category);
    return tempCategory ? tempCategory : {}
}