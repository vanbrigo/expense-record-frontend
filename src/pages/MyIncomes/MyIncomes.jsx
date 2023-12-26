import { Container } from "react-bootstrap"
import "./MyIncomes.css"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { userData } from "../userSlice"
import { getAllIncomesByDate } from "../../services/apiCalls"
import dayjs from "dayjs"

export const MyIncomes=()=>{
    const [incomes, setIncomes]=useState([])
    const date=dayjs()
    const month=date.month()+1
    const year=date.year()
    const rdxCredentials=useSelector(userData)
    const token=rdxCredentials.credentials.token

    useEffect(()=>{
        if(incomes.length===0){
            getAllIncomesByDate(month,year,token)
            .then(result=>{
                setIncomes(result.data.data)
                console.log(result.data.data)
            })
            .catch(error=>console.log(error))
        }
    },[incomes])
    return(<Container fluid className="myIncomesDesign">
        {
            incomes.length>0 
            ?(<div className="myIncomesBox">
            {incomes.map(income=>{
                return(<div className='myIncomesBoxInside' key={income.id}>
                    <div className="singleBoxMyIncome">{income.category.name}</div>
                    <div className="singleBoxMyIncome">{income.amount}</div>
                    <div className="singleBoxMyIncome">{income.date}</div>
                </div>)
            })}
            </div>)
            :(<>Nothing here</>)
        }
    </Container>)
}