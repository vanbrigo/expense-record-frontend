import axios from 'axios'

const host='http://localhost:8000'

export const getAllExpensesCategories = async(token)=>{
    return await axios.get(`${host}/api/categories-expenses`,{headers:{Authorization:`Bearer ${token}`}})
}

export const getAllUsers = async(token)=>{
    return await axios.get(`${host}/api/all-users`,{headers:{Authorization:`Bearer ${token}`}})
}

export const getAllCategories = async(token)=>{
    return await axios.get(`${host}/api/all-categories`,{headers:{Authorization:`Bearer ${token}`}})
}

export const getAllIncomesCategories = async(token)=>{
    return await axios.get(`${host}/api/categories-incomes`,{headers:{Authorization:`Bearer ${token}`}})
}

export const getAllIncomes = async(token)=>{
    return await axios.get(`${host}/api/all-incomes`,{headers:{Authorization:`Bearer ${token}`}})
}

export const getAllBalances = async(token)=>{
    return await axios.get(`${host}/api/all-balances`,{headers:{Authorization:`Bearer ${token}`}})
}

export const getAllExpensesByDate = async(month,year,token)=>{
    return await axios.get(`${host}/api/expenses?month=${month}&year=${year}`,{headers:{Authorization:`Bearer ${token}`}})
}

export const getAllIncomesByDate = async(month,year,token)=>{
    return await axios.get(`${host}/api/incomes?month=${month}&year=${year}`,{headers:{Authorization:`Bearer ${token}`}})
}

export const getOneBalanceByDate = async(month,year,token)=>{
    return await axios.get(`${host}/api/balance?month=${month}&year=${year}`,{headers:{Authorization:`Bearer ${token}`}})
}

export const getBalanceByDate = async(month,year,token)=>{
    return await axios.get(`${host}/api/balance-date?month=${month}&year=${year}`,{headers:{Authorization:`Bearer ${token}`}})
}

export const getUserProfile = async(token)=>{
    return await axios.get(`${host}/api/profile`,{headers:{Authorization:`Bearer ${token}`}})
}

export const updateUserNickname = async(body,token)=>{
    return await axios.put(`${host}/api/edit-nickname`,body,{headers:{Authorization:`Bearer ${token}`}})
}

export const updateUserAvatar = async(body,token)=>{
    return await axios.put(`${host}/api/edit-avatar`,body,{headers:{Authorization:`Bearer ${token}`}})
}

export const updateUserRole = async(id,body,token)=>{
    return await axios.put(`${host}/api/user-role/${id}`,body,{headers:{Authorization:`Bearer ${token}`}})
}

export const activateUser = async(id,token)=>{
    return await axios.put(`${host}/api/user-activate/${id}`,{},{headers:{Authorization:`Bearer ${token}`}})
}

export const inactivateUser = async(id,token)=>{
    return await axios.put(`${host}/api/user-inactivate/${id}`,{},{headers:{Authorization:`Bearer ${token}`}})
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

export const deleteCategoryAsSuperAdmin = async(id,token)=>{
    return await axios.delete(`${host}/api/delete-category/${id}`,{headers:{Authorization:`Bearer ${token}`}})
}

export const deleteIncome = async(id,token)=>{
    return await axios.delete(`${host}/api/delete-income/${id}`,{headers:{Authorization:`Bearer ${token}`}})
}