import './MyExpenses.css'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userData } from '../userSlice'
import { deleteExpense, getAllExpensesByDate } from '../../services/apiCalls'

export const MyExpenses=()=>{
    const [expenses, setExpenses]=useState([])
    const navigate = useNavigate()
    const date=dayjs()
    const month=date.month()+1
    const year=date.year()
    const rdxCredentials=useSelector(userData)
    const token=rdxCredentials.credentials.token

    useEffect(()=>{
        if(expenses.length===0){
            getAllExpensesByDate(month,year,token)
            .then(result=>{
                setExpenses(result.data.data)
                console.log(result.data.data)
            })
            .catch(error=>console.log(error))
        }
    },[expenses])

    const functionDeleteExpense=(id)=>{
        deleteExpense(id,token)
        .then(result=>{
            // setMsgDelete(result.data.message)
            setExpenses([])
        })
        .catch(error=>console.log(error))
    } 
    return(<Container fluid className='myExpensesDesign'>
        <div>
        <img 
        className='backIcon'
        onClick={()=>navigate('/home')}
        width="50" 
        height="50" 
        src="https://img.icons8.com/ios/50/1A1A1A/circled-left-2.png" 
        alt="circled-left-2"/>
        </div>
        {
            expenses.length>0 
            ?(<div className="myExpensesBox">
            {expenses.map(expense=>{
                return (
                  <div className="myExpensesBoxInside" key={expense.id}>
                    <div>
                      <img
                        width="30"
                        height="30"
                        src={expense.category.icon_url}
                        alt="category_icon"
                      ></img>
                    </div>
                    <div className="singleBoxMyExpenses">
                      {expense.category.name}
                    </div>
                    <div className="singleBoxMyExpenses">{dayjs(expense.date).format('DD-MMMM')}</div>
                    <div className="singleBoxMyExpenses amountMyExpenses">
                      <img
                        width="25"
                        height="25"
                        src="https://img.icons8.com/windows/32/1A1A1A/euro-pound-exchange.png"
                        alt="euro-pound-exchange"
                      />
                      {expense.amount}
                    </div>
                    <div>
                      <img
                        onClick={()=>functionDeleteExpense(expense.id)}
                        className="deleteIcon"
                        width="24"
                        height="24"
                        src="https://img.icons8.com/material-outlined/24/1A1A1A/waste.png"
                        alt="waste"
                      />{" "}
                    </div>
                  </div>
                );
            })}
            </div>)
            :(<>Nothing here</>)
        }
    </Container>)
}