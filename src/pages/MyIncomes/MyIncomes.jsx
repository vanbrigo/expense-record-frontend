import { Container } from "react-bootstrap"
import "./MyIncomes.css"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { userData } from "../userSlice"
import { deleteIncome, getAllIncomesByDate, getAllIncomesCategories, updateCategoryIncome } from "../../services/apiCalls"
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
    const [clickIncome, setClickIncome]=useState(null)
    const [categories,setCategories]=useState([])

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

    useEffect(()=>{
        if(categories.length===0){
            getAllIncomesCategories(token)
            .then(result=>{
                setCategories(result.data.data)
                console.log(result.data.data)
            })
            .catch(error=>console.log(error))
        }
    },[clickIncome])

    const functionDeleteIncome=(id)=>{
        deleteIncome(id,token)
        .then(result=>{
            // setMsgDelete(result.data.message)
            setIncomes([])
        })
        .catch(error=>console.log(error))
    } 
    const updateCategory=(id)=>{
        setClickIncome(id)
    }
    const functionUpdate = (e) => {
        const category={category:e.target.value}
        console.log(category)
        updateCategoryIncome(clickIncome,category,token)
        .then(result=>{
            console.log(result)
            setClickIncome(null)
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
                        alt="category_icon">
                        </img>
                    </div>
                    <div className="singleBoxMyIncome categoryMyIncome">
                    {clickIncome===income.id
                      ?(<>
                      <select key={income.category.id} onChange={functionUpdate}>
                        <option>Select new category</option>
                        {categories.map(category=>{
                            return(<option key={category.id} value={category.id}>{category.name}</option>)
                        })}
                      </select>
                      </>) 
                      :(<>
                       {income.category.name}
                      <img
                        width="20"
                        height="20"
                        className="editButtonMyIncome"
                        onClick={() => updateCategory(income.id)}
                        src="https://img.icons8.com/parakeet-line/48/1A1A1A/pencil.png"
                        alt="pencil"
                      />
                      </>)}
                      {/* {income.category.name}
                      <img
                        width="20"
                        height="20"
                        className="editButtonMyIncome"
                        // onClick={() => updateCategory(income.category.id)}
                        src="https://img.icons8.com/parakeet-line/48/1A1A1A/pencil.png"
                        alt="pencil"
                      /> */}
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