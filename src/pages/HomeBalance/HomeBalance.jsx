import { Container } from 'react-bootstrap'
import './HomeBalance.css'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { getAllExpensesByDate } from '../../services/apiCalls'
import { useSelector } from 'react-redux'
import { userData } from '../userSlice'
import { useNavigate } from 'react-router-dom'
import { HeaderButton } from '../../common/HeaderButton/HeaderButton'

export const HomeBalance=()=>{
    const rdxCredentials=useSelector(userData)
    const navigate= useNavigate()
    const token=rdxCredentials.credentials.token
    const [expenses, setExpenses]=useState([])
    const date=dayjs()
    const month=date.month()+1
    const year=date.year()

    useEffect(()=>{
        if(expenses.length === 0){
            getAllExpensesByDate(month,year,token)
            .then(
                result=>{
                    setExpenses(result.data.data)
                })
            .catch(error=>console.log(error))
        }
    },[expenses])

    return(
        <Container fluid className='balanceDesign'>
            {
                expenses.length >0
                ?(<div className='balanceBox'>
                    {expenses.map(expense=>{
                        return(
                        <div key={expense.id}>
                            {expense.category.name}
                            {expense.amount}
                        </div>)
                        
                    })}
                </div>)
                :(<></>)    
            }
            <div className='balanceButtonsBox'>
            <HeaderButton 
            path='/new-income'
            title='New income'
            />
            <HeaderButton 
            path='/new-expense'
            title='New expense'
            />
            </div>
        </Container>
    )
}