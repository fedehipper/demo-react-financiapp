export default {
    get: (url) => {
        return fetch(url);
    },
    put: (url, body) => {
        const requestOptions = {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
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
    },
    delete: (url) => {
        const requestOptions = {
            method: 'DELETE',
        }
        return fetch(url, requestOptions);
    }
};