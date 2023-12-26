import { Container } from "react-bootstrap"
import "./MyIncomes.css"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { userData } from "../userSlice"
import { getAllIncomesByDate } from "../../services/apiCalls"

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
            .then(result=>setIncomes(result.data.data))
            .catch(error=>console.log(error))
        }
    },[incomes])
    return(<Container fluid className="myIncomesDesign">
        {
            incomes.length>0 
            ?(<>
            {incomes.map(income=>{
                return(<div key={income.id}>
                    <div>{income.category}</div>
                    <div>{income.amount}</div>
                </div>)
            })}
            </>)
            :(<>Nothing here</>)
        }
    </Container>)
}