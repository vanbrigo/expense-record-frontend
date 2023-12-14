import axios from 'axios'

const host='http://localhost:8000'

export const getAllExpensesCategories = async(token)=>{
    return await axios.get(`${host}/api/categories-expenses`,{headers:{Authorization:`Bearer ${token}`}})
}

export const getAllIncomesCategories = async(token)=>{
    return await axios.get(`${host}/api/categories-incomes`,{headers:{Authorization:`Bearer ${token}`}})
}

export const getAllExpensesByDate = async(month,year,token)=>{
    return await axios.get(`${host}/api/expenses?month=${month}&year=${year}`,{headers:{Authorization:`Bearer ${token}`}})
}

export const getUserProfile = async(token)=>{
    return await axios.get(`${host}/api/profile`,{headers:{Authorization:`Bearer ${token}`}})
}

export const updateUserNickname = async(body,token)=>{
    return await axios.put(`${host}/api/edit-nickname`,body,{headers:{Authorization:`Bearer ${token}`}})
}

export const logUser = async(body)=>{
    return await axios.post(`${host}/api/login`,body)
}

export const registerUser = async(body)=>{
    return await axios.post(`${host}/api/register`,body)
}

export const addExpense = async(body,token)=>{
    return await axios.post(`${host}/api/new-expense`,body,{headers:{Authorization:`Bearer ${token}`}})
}

export const addIncome = async(body,token)=>{
    return await axios.post(`${host}/api/new-income`,body,{headers:{Authorization:`Bearer ${token}`}})
}