let _csrfToken = null;

export default async function getCsrfToken() {
    if(_csrfToken === null) {
        const response = await fetch('http://127.0.0.1:5000' + '/api/csrf/', {
            credentials: 'include',
        });
        const data = await response.json();
        _csrfToken = data.csrfToken;
    }
    return _csrfToken;
}