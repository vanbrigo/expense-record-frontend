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

export const updateCategoryIncome = async(id,body,token)=>{
    return await axios.put(`${host}/api/edit-income-category/${id}`,body,{headers:{Authorization:`Bearer ${token}`}})
}

export const updateCategoryExpense = async(id,body,token)=>{
    return await axios.put(`${host}/api/edit-expense-category/${id}`,body,{headers:{Authorization:`Bearer ${token}`}})
}

export const updateAmountIncome = async(id,body,token)=>{
    return await axios.put(`${host}/api/edit-income-amount/${id}`,body,{headers:{Authorization:`Bearer ${token}`}})
}

export const updateAmountExpense = async(id,body,token)=>{
    return await axios.put(`${host}/api/edit-expense-amount/${id}`,body,{headers:{Authorization:`Bearer ${token}`}})
}

export const activateUser = async(id,token)=>{
    return await axios.put(`${host}/api/user-activate/${id}`,{},{headers:{Authorization:`Bearer ${token}`}})
}

export const inactivateUser = async(id,token)=>{
    return await axios.put(`${host}/api/user-inactivate/${id}`,{},{headers:{Authorization:`Bearer ${token}`}})
}

export const inactivateCategory = async(id,token)=>{
    return await axios.put(`${host}/api/category-inactivate/${id}`,{},{headers:{Authorization:`Bearer ${token}`}})
}

export const activateCategory = async(id,token)=>{
    return await axios.put(`${host}/api/category-activate/${id}`,{},{headers:{Authorization:`Bearer ${token}`}})
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
export const createCategory = async(body,token)=>{
    return await axios.post(`${host}/api/new-category`,body,{headers:{Authorization:`Bearer ${token}`}})
}

export const deleteCategoryAsSuperAdmin = async(id,token)=>{
    return await axios.delete(`${host}/api/delete-category/${id}`,{headers:{Authorization:`Bearer ${token}`}})
}

export const deleteIncome = async(id,token)=>{
    return await axios.delete(`${host}/api/delete-income/${id}`,{headers:{Authorization:`Bearer ${token}`}})
}

export const deleteExpense = async(id,token)=>{
    return await axios.delete(`${host}/api/delete-expense/${id}`,{headers:{Authorization:`Bearer ${token}`}})
}