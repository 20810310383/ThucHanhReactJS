import axios from "../utils/axios-customize"

export const callRegister = (fullName, email, password, phone) => {
    const URL_BACKEND = '/api/v1/user/register'
    const data = {
        fullName, email, password, phone
    }
    return axios.post(URL_BACKEND, data)
}

export const callLogin = (username, password) => {
    const URL_BACKEND = '/api/v1/auth/login'
    const data = {
        username, password
    }
    return axios.post(URL_BACKEND, data)
}

export const callFetchAccount = () => {
    return axios.get('/api/v1/auth/account')
}

export const callLogout = () => {
    return axios.post('/api/v1/auth/logout')
}


export const callFetchListUser = (query) => {
    const URL_BACKEND = `/api/v1/user?${query}`    
    return axios.get(URL_BACKEND)
}

export const deleteUserAPI = (_id) => { 
    const URL_BACKEND = `/api/v1/user/${_id}`
    return axios.delete(URL_BACKEND)
}