import { Container } from "react-bootstrap"
import "./MyIncomes.css"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { userData } from "../userSlice"
import { deleteIncome, getAllIncomesByDate } from "../../services/apiCalls"
import dayjs from "dayjs"
import { useNavigate } from "react-router-dom"

export const MyIncomes=()=>{
    const [incomes, setIncomes]=useState([])
    const navigate = useNavigate()
    const date=dayjs()
    const month=date.month()+1
    const year=date.year()
    const rdxCredentials=useSelector(userData)
    const token=rdxCredentials.credentials.token
    const [clickCategory, setClickCategory]=useState(null)

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

    const functionDeleteIncome=(id)=>{
        deleteIncome(id,token)
        .then(result=>{
            // setMsgDelete(result.data.message)
            setIncomes([])
        })
        .catch(error=>console.log(error))
    } 
    return(<Container fluid className="myIncomesDesign">
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
            incomes.length>0 
            ?(<div className="myIncomesBox">
            {incomes.map(income=>{
                return (
                  <div className="myIncomesBoxInside" key={income.id}>
                    <div>
                      <img
                        width="30"
                        height="30"
                        src={income.category.icon_url}
                        alt="category_icon"
                      ></img>
                    </div>
                    <div className="singleBoxMyIncome">
                      {income.category.name}
                    </div>
                    <div className="singleBoxMyIncome">{dayjs(income.date).format('DD-MMMM')}</div>
                    <div className="singleBoxMyIncome amountMyIncome">
                      <img
                        width="25"
                        height="25"
                        src="https://img.icons8.com/windows/32/1A1A1A/euro-pound-exchange.png"
                        alt="euro-pound-exchange"
                      />
                      {income.amount}
                    </div>
                    <div>
                      <img
                        onClick={()=>functionDeleteIncome(income.id)}
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