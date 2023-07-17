import React from 'react'
import axios from 'axios'

const api_prod = axios.create ({
  url: 'http://domain'
})

const api_dev = axios.create ({
  url: 'http://localhost:8800'
})

export const config_api = process.env.NODE_ENV === 'development' ? api_dev : api_prod