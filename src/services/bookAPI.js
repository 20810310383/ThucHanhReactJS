import axios from "../utils/axios-customize"


export const callFetchBook = (query) => {
    const URL_BACKEND = `/api/v1/book?${query}`    
    return axios.get(URL_BACKEND)
}

export const deleteBookAPI = (_id) => { 
    const URL_BACKEND = `/api/v1/book/${_id}`
    return axios.delete(URL_BACKEND)
}