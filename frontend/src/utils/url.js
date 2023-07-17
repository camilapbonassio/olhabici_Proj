
const baseURL_prod = {
    url: 'https://domain'
};

const baseURL_dev = {
    url: 'http://localhost:8800'
};

export const config = process.env.NODE_ENV === 'development' ? baseURL_dev : baseURL_prod;