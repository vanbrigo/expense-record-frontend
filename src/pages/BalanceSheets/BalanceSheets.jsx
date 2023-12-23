import './BalanceSheets.css'
import { Container } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { getAllBalances, getAllIncomes, getBalanceByDate, getOneBalanceByDate } from '../../services/apiCalls'
import { useSelector } from 'react-redux'
import { userData } from '../userSlice'
import dayjs from 'dayjs'
import { all } from 'axios'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useNavigate } from 'react-router-dom'

export const BalanceSheets = () => {
  const rdxCredentials = useSelector(userData);
  const navigate=useNavigate()
  const token = rdxCredentials.credentials.token;
  const [incomes, setIncomes] = useState([]);
  const [data, setData] = useState({});
  const [balance, setBalance] = useState();
  const [date, setDate] = useState();
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Balance: ${balance}`,
      },
    },
  }
  useEffect(()=>{
    if(!token){
        navigate('/')
    }
  },[token]) 
  useEffect(() => {
    if (incomes.length === 0) {
      getAllIncomes(token)
        .then((result) => {
          const allIncomes = result.data.data;
          const dateIncomes = allIncomes.map((income) => {
            return dayjs(income.date).format("MMMM-YYYY");
          });
          const incomesSet = new Set(dateIncomes);
          setIncomes(incomesSet);
        })
        .catch((error) => console.log(error));
    }
  }, [incomes]);
  useEffect(() => {
    if (date) {
      const month = dayjs(date).format("MM");
      const year = dayjs(date).format("YYYY");
      getBalanceByDate(month, year, token)
        .then((result) => {
          const dataResult = result.data.data;
          const dataUpdated = {
            labels: [date],
            datasets: [
              {
                label: "Incomes",
                data: [dataResult.incomes],
                backgroundColor: "rgb(22, 136, 121)",
              },
              {
                label: "Expenses",
                data: [dataResult.expenses],
                backgroundColor: "rgb(77, 22, 136)",
              },
            ],
          };
          setData(dataUpdated);
          setBalance(dataResult.balance);
        })
        .catch((error) => console.log(error));
    }
  }, [date]);

  const functionHandler = (e) => {
    setDate(e.target.value);
  };
  return (
    <Container fluid className="balanceSheetsDesign">
      {incomes.size > 0 ? (
        <>
          <select name="date" onChange={functionHandler}>
            <option>Select a date</option>
            {Array.from(incomes).map((element, index) => {
              return <option key={index}>{element}</option>;
            })}
          </select>
          {data && data.labels && data.datasets && (
            <div className="oldBalanceBox">
              <Bar data={data} options={options} />
            </div>
          )}
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};