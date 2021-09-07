let headers = {
    headers: {
        'x-api-key': '6uWwq7jofz75Ij3QeamBuayGUQQQnNNs9q4wNeXD',
        'Content-Type': 'application/json'
    }
} 

module.exports = {
    getRequestHeader: () => {
       return headers;
    },
    getCustomRequestHeader: (key, value) => {
        let internalHeaders = headers.headers
        let headersCustom = { headers: { ...internalHeaders }};
        headersCustom.headers[key] = value;
        return headersCustom;
    }
}