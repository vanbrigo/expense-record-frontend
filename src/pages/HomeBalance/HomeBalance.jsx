import { Container } from 'react-bootstrap'
import './HomeBalance.css'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { getAllExpensesByDate } from '../../services/apiCalls'
import { useSelector } from 'react-redux'
import { userData } from '../userSlice'
import { useNavigate } from 'react-router-dom'
import { HeaderButton } from '../../common/HeaderButton/HeaderButton'
import { PieChart } from '../../common/PieChart/PieChart'

export const HomeBalance=()=>{
    const rdxCredentials=useSelector(userData)
    const navigate= useNavigate()
    const token=rdxCredentials.credentials.token
    const [expenses, setExpenses]=useState([])
    const date=dayjs()
    const month=date.month()+1
    const year=date.year()
    const [dataPieChart,setDataPieChart] =useState({})

    useEffect(()=>{
        if(expenses.length === 0){
            getAllExpensesByDate(month,year,token)
            .then(
                result=>{
                    const gastos=result.data.data
                    setExpenses(gastos)  
                    const categoriasGastos = gastos.reduce((acc, expense) => {
                        const categoria = expense.category.name;
                        if (acc[categoria]) {
                          acc[categoria] += parseFloat(expense.amount);
                        } else {
                          acc[categoria] = parseFloat(expense.amount);
                        }
                        return acc;
                      }, {});
                      const categorias=Object.keys(categoriasGastos)
                      const dataPie = {
                        labels: categorias,
                        datasets: [
                          {
                            data: Object.values(categoriasGastos),
                            backgroundColor:['#5d2096','#0000ff24','#008b8b','#ccc91d','#238611','#861159','#861111','#e9ab0e','#5fcaa3','#96ca5f','#f2880f','#6a0ff2','#c50ff2'],
                            hoverBackgroundColor:['#5d2096','#0000ff24','#008b8b','#ccc91d','#238611','#861159','#861111','#e9ab0e','#5fcaa3','#96ca5f','#f2880f','#6a0ff2','#c50ff2'],
                          },
                        ],
                      };
                      setDataPieChart(dataPie)
                      console.log(result.data.data)
                      console.log(Object.values(categoriasGastos))
                })
            .catch(error=>console.log(error))
        }
    },[expenses])

    return(
        <Container fluid className='balanceDesign'>
            {
                expenses.length >0
                ?(<div className='balanceBox'>
                    <PieChart data={dataPieChart} />
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