import './BalanceSheets.css'
import { Container } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { getAllBalances } from '../../services/apiCalls'
import { useSelector } from 'react-redux'
import { userData } from '../userSlice'
import dayjs from 'dayjs'

export const BalanceSheets=()=>{
    const rdxCredentials=useSelector(userData)
    const token=rdxCredentials.credentials.token
    const [balances,setBalances]=useState([])
    useEffect(()=>{
        if(balances.length===0){
            getAllBalances(token)
            .then(result=>{
                setBalances(result.data.data)
                console.log(result.data.data)
            })
            .catch(error=>console.log(error))
        }
    })
    return(
    <Container fluid className='balanceSheetsDesign'>
        {balances.length>0
        ?(<>
        <select name='date'>
            <option>Select a date</option>
            {balances.map(element=>{
                return(
                    <option key={element.id}>{dayjs(element.date).format('MMMM-YYYY')}</option>
                )
            })}
        </select>
        </>)
        :(<></>)}

    </Container>)
}