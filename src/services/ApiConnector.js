

import axios from 'axios'

const apiInstance = axios.create({})

export const apiConnector = async (method, url, bodyData, params, headers) => {
    return apiInstance({
        method: `${method}`,
        url: `${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params: params ? params : null,
    })
}