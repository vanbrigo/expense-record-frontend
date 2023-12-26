import { Container } from 'react-bootstrap'
import './HomeBalance.css'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { getAllExpensesByDate, getAllIncomesByDate } from '../../services/apiCalls'
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
    const [incomes, setIncomes]=useState([])
    const date=dayjs()
    const month=date.month()+1
    const year=date.year()
    const [dataPieChart,setDataPieChart] =useState({})
    const [dataPieChartIncomes,setDataPieChartIncomes]=useState({})
    const [totalAmounts,setTotalAmounts]=useState({
      totalIncomes:'',
      totalExpenses:''
    })
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
                      }, {})
                      const sumaTotalGastos = Object.values(categoriasGastos).reduce(
                        (total, value) => total + value
                      )
                      setTotalAmounts((prevState) => ({
                        ...prevState,
                        totalExpenses: sumaTotalGastos
                      }));
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
                })
            .catch(error=>console.log(error))
        }
    },[expenses])

    useEffect(()=>{
      if(!token){
          navigate('/')
      }
    },[token]) 

    useEffect(()=>{
      if(incomes.length===0){
        getAllIncomesByDate(month,year,token)
        .then(result=>{
          const ingresos=result.data.data 
          setIncomes(ingresos)
          const categoriasIngresos= ingresos.reduce((acc, income) => {
            const categoria = income.category.name;
                        if (acc[categoria]) {
                          acc[categoria] += parseFloat(income.amount);
                        } else {
                          acc[categoria] = parseFloat(income.amount);
                        }
                        return acc;
          },{})
          const sumaTotalIngresos = Object.values(categoriasIngresos).reduce(
            (total, value) => total + value
          )
          setTotalAmounts((prevState) => ({
            ...prevState,
            totalIncomes: sumaTotalIngresos
          }));
          const categorias=Object.keys(categoriasIngresos)
                      const dataPieIncomes = {
                        labels: categorias,
                        datasets: [
                          {
                            data: Object.values(categoriasIngresos),
                            backgroundColor:['#e9ab0e','#5fcaa3','#96ca5f','#f2880f','#6a0ff2','#c50ff2'],
                            hoverBackgroundColor:['#e9ab0e','#5fcaa3','#96ca5f','#f2880f','#6a0ff2','#c50ff2'],
                          },
                        ],
                      };
                      setDataPieChartIncomes(dataPieIncomes)
        })
        .catch(error=>console.log(error))
      }
    },[incomes])

    return (
      <Container fluid className="balanceDesign">
        <span className="dateBalance">{date.format("DD-MMMM-YYYY")}</span>
        <span className='balanceName'>BALANCE: <span className={`balanceHomeAmount ${totalAmounts.totalIncomes-totalAmounts.totalExpenses >0 ?'' :'redBalance'}`}>{totalAmounts.totalIncomes-totalAmounts.totalExpenses}</span></span>
        <div className="allBalancesBox">
          {incomes.length > 0 ? (
            <div className="balanceBox">
              <HeaderButton path="/" title="Incomes" />
              <span className='typeBalanceName'>TOTAL: {totalAmounts.totalIncomes}</span>
              <PieChart data={dataPieChartIncomes} />
              
            </div>
          ) : (
            <></>
          )}
          {expenses.length > 0 ? (
            <div className="balanceBox">
              <HeaderButton path="/" title="Expenses" />
              <span className='typeBalanceName'>TOTAL: {totalAmounts.totalExpenses}</span>
              <PieChart data={dataPieChart} />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className='buttonsBox'>
        <div className="addIncomeBox">
                <img
                  onClick={() => navigate("/new-income")}
                  width="24"
                  height="24"
                  src="https://img.icons8.com/material-outlined/24/1A1A1A/add.png"
                  alt="add"
                />
                <HeaderButton path="/new-income" title="Add income" />
              </div>
          <div className="addIncomeBox">
                <img
                  onClick={() => navigate("/new-expense")}
                  width="24"
                  height="24"
                  src="https://img.icons8.com/material-outlined/24/1A1A1A/add.png"
                  alt="add"
                />
                <HeaderButton path="/new-expense" title="Add expense" />
              </div>
          </div>
      </Container>
    );
}