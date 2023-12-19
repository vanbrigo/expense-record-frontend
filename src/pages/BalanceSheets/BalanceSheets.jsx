import './BalanceSheets.css'
import { Container } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { getAllBalances, getOneBalanceByDate } from '../../services/apiCalls'
import { useSelector } from 'react-redux'
import { userData } from '../userSlice'
import dayjs from 'dayjs'

export const BalanceSheets=()=>{
    const rdxCredentials=useSelector(userData)
    const token=rdxCredentials.credentials.token
    const [balances,setBalances]=useState([])
    const [oneBalance,setOneBalance]=useState()
    const [date,setDate]=useState()
    useEffect(()=>{
        if(balances.length===0){
            getAllBalances(token)
            .then(result=>{
                setBalances(result.data.data)
            })
            .catch(error=>console.log(error))
        }
    },[balances])
    useEffect(()=>{
        if(date){
            const month=dayjs(date).format('MM')
            const year= dayjs(date).format('YYYY')
            getOneBalanceByDate(month,year,token)
            .then(result=>setOneBalance(result.data.data[0]))
            .catch(error=>console.log(error))
        }
    },[date])
    const functionHandler = (e) => {
        setDate(e.target.value)
    }
    return(
    <Container fluid className='balanceSheetsDesign'>
        {balances.length>0
        ?(<>
        <select name='date' onChange={functionHandler}>
            <option>Select a date</option>
            {balances.map(element=>{
                return(
                    <option key={element.id}>{dayjs(element.date).format('MMMM-YYYY')}</option>
                )
            })}
        </select>
        {oneBalance &&
        <div className='oldBalanceBox'>
        <div className='balanceBoxInside balanceAmount'><span>Balance</span> {oneBalance.balance}</div>
        <div className='balanceBoxInside'><span>Incomes</span> {oneBalance.income}</div>
        <div className='balanceBoxInside'><span>Expenses</span> {oneBalance.expenses}</div>
        </div>
        }
        </>)
        :(<></>)}

    </Container>)
}