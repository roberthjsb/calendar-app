const baseUrl = process.env.REACT_APP_API_URL;

export const fetchWithoutToken = (endpoint, data, method = 'GET') => {
    const url = `${baseUrl}${endpoint}`;
    const options = method !== 'GET'
        ? { method, headers: { 'Content-type': 'application/json' }, body: JSON.stringify(data) }
        : null;
    return fetch(url, options)
}

export const fetchWithToken = (endpoint, data, method = 'GET') => {
    const token = localStorage.getItem('token') || '';
    const options = method === 'GET'
        ? { method, headers: { 'x-token': token } }
        : { method, headers: { 'Content-type': 'application/json', 'x-token': token }, body: JSON.stringify(data) }
        return ConfigFetch(endpoint, options);

}

const ConfigFetch = (endpoint, options) => {
    const url = `${baseUrl}${endpoint}`;
    const promise =fetch(url, options).then(resp =>{
        const {status,statusText}= resp;
        if(status!==200 && status!==401) throw Error({status,statusText});
        return resp;
    })
    return promise
}


