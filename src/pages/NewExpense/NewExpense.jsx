import { useState } from 'react'
import './NewExpense.css'
import { Container } from 'react-bootstrap'

export const NewExpense=()=>{
    const[expenseDetails, setExpenseDetails]=useState({
        amount:'',
        category_id:'',
        description:'',
        date:'',
        pay_method_id:''
    })

    return(
    <Container fluid>

    </Container>
    )
}