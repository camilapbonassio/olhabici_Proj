
const baseURL_prod = {
    url: '/api'
};

const baseURL_dev = {
    url: 'http://localhost:8800/api'
};

export const config = process.env.NODE_ENV === 'production' ? baseURL_prod  : baseURL_dev;