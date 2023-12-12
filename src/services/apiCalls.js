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

export const addExpense = async(body,token)=>{
    return await axios.post(`${host}/api/new-expense`,body,{headers:{Authorization:`Bearer ${token}`,Accept:'application/json'}})
}

export const addIncome = async(body,token)=>{
    console.log(body)
    console.log(token)
    return await axios.post(`${host}/api/new-income`,body,{headers:{Authorization:`Bearer ${token}`}})
}