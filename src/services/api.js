import instance from "../utils/axios-customize"

export const callRegister = (fullName, email, password, phone) => {
    const URL_BACKEND = '/api/v1/user/register'
    const data = {
        fullName, email, password, phone
    }
    return instance.post(URL_BACKEND, data)
}
