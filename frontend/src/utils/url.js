
const baseURL_prod = {
    url: 'https://olhabici-app-6e44bb6e118a.herokuapp.com/'
};

const baseURL_dev = {
    url: 'http://localhost:8800'
};

export const config = process.env.NODE_ENV === 'development' ? baseURL_dev : baseURL_prod;