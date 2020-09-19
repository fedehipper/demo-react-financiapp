export default {
    get: (url) => {
        return fetch(url);
    },
    put: (url) => {
        const requestOptions = {
            method: 'PUT'
        };
        return fetch(url, requestOptions);
    }
};