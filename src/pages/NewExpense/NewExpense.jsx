import { useEffect, useState } from 'react'
import './NewExpense.css'
import { Container } from 'react-bootstrap'
import { getAllExpensesCategories } from '../../services/apiCalls'
import { CustomNumberInput } from '../../common/CustomNumberInput/CustomNumberInput'
import { CustomInput } from '../../common/CustomInput/CustomInput'
import { validator } from '../../services/validations'
import dayjs from 'dayjs'

export const NewExpense=()=>{
    const [todayDate,setTodayDate]=useState('')
    const[categories,setCategories]=useState([])
    const[expenseDetails, setExpenseDetails]=useState({
        amount:'',
        category_id:'',
        description:'',
        date:'',
        pay_method_id:''
    })
    const [expenseDetailsError,setExpenseDetailsError]=useState({
        descriptionError:''
    })
    const functionHandler = (e) => {
        setExpenseDetails((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }
    useEffect(()=>{
        if(categories.length === 0){
            getAllExpensesCategories()
            .then(result=> {
                setCategories(result.data.data)
            })
            .catch(error=>console.log(error))
        }
    },[categories])

    useEffect(()=>{
        const today=dayjs()
        setTodayDate(today.format('YYYY-MMMM-DD'))
    },[])

    const errorCheck = (e) => {
        let error = "";
        error = validator(e.target.name, e.target.value);
    
        setExpenseDetailsError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }));
      }

    return(
    <Container fluid className='newExpenseDesign'>
        <div>{todayDate}</div>
        <div className='expenseInputBox'>
        <CustomNumberInput
        name={'amount'}
        style={'expenseInput'}
        max={'100000'}
        placeholder={'insert amount'}
        functionProp={functionHandler}
        />
        </div>
        <div className='payMethodBox'>
        <img className='payMethodImage' width="50" height="50" src="https://img.icons8.com/ios/50/bank-card-back-side--v1.png" alt="bank-card-back-side--v1"/>
        <img className='payMethodImage' width="50" height="50" src="https://img.icons8.com/ios/50/banknotes.png" alt="banknotes"/>
        </div>
        <div>
            {categories.length > 0
            ?(<div className='categoriesDesign'>
            {
                categories.map(
                    category =>{
                        return(
                            <div key={category.id} value={category.id} className='categoryBox'>
                                <img src={category.icon_url} className='categoryIcon'></img>
                                {category.name}
                            </div>
                        )
                    }
                )
            }
            </div>)
            :(<>
            No hay categorias
            </>)
            }
        </div>
        <div className='descriptionBox'>
            <CustomInput
            name={"description"}
            type={"text"}
            style={'descriptionInput'}
            lenght={"50"}
            placeholder={"description"}
            functionProp={functionHandler}
            functionCheck={errorCheck}
            />
        </div>
    </Container>
    )
}