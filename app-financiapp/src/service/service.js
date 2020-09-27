export default {
    get: (url) => {
        return fetch(url);
    },
    put: (url) => {
        const requestOptions = {
            method: 'PUT'
        };
        return fetch(url, requestOptions);
    },
    post: (url, body) => {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return fetch(url, requestOptions);
    }
};