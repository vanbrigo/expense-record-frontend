import axios from 'axios'

const host='http://localhost:8000'

export const getAllExpensesCategories = async()=>{
    return await axios.get(`${host}/api/categories-expenses`)
}

export const logUser = async(body)=>{
    return await axios.post(`${host}/api/login`,body)
}

export const registerUser = async(body)=>{
    return await axios.post(`${host}/api/register`,body)
}