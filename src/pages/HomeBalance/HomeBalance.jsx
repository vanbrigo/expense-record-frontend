import { Container } from 'react-bootstrap'
import './HomeBalance.css'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { getAllExpensesByDate } from '../../services/apiCalls'
import { useSelector } from 'react-redux'
import { userData } from '../userSlice'

export const HomeBalance=()=>{
    const rdxCredentials=useSelector(userData)
    const token=rdxCredentials.credentials.data.token
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
        <Container fluid>
            {
                expenses.length >0
                ?(<div>
                    {expenses.map(expense=>{
                        return(
                        <div key={expense.id}>
                            {expense.category_id}
                        </div>)
                        
                    })}
                </div>)
                :(<></>)
            }

        </Container>
    )
}