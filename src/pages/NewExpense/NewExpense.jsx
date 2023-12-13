import { useEffect, useState } from 'react'
import './NewExpense.css'
import { Container } from 'react-bootstrap'
import { addExpense, getAllExpensesCategories } from '../../services/apiCalls'
import { CustomNumberInput } from '../../common/CustomNumberInput/CustomNumberInput'
import { CustomInput } from '../../common/CustomInput/CustomInput'
import { validator } from '../../services/validations'
import dayjs from 'dayjs'
import { CustomButton } from '../../common/CustomButton/CustomButton'
import { useSelector } from 'react-redux'
import { userData } from '../userSlice'

export const NewExpense=()=>{
    const [todayDate,setTodayDate]=useState('')
    const[categories,setCategories]=useState([])
    const rdxCredentials=useSelector(userData)
    const token=rdxCredentials.credentials.data.token
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
        console.log(e.target.value)
    }
    useEffect(()=>{
        if(categories.length === 0){
            getAllExpensesCategories(token)
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
    const addExpenseFunction=()=>{
        addExpense(expenseDetails,token)
        .then(result=>console.log(result))
        .catch(error=>console.log(error))
    }

    return(
    <Container fluid className='newExpenseDesign'>
        <div className='dateBox'>
        {expenseDetails.date==''
        ?(<>Select a date</>)
        :(<>{dayjs(expenseDetails.date).format('MMMM-DD-YYYY')}</>)}
        <input
         name='date'
         type='date'
         className='inputDate'
         onChange={(e)=>functionHandler(e)}
         />
        </div>
        <div className='expenseInputBox'>
        <img width="32" 
        height="32" 
        src="https://img.icons8.com/windows/32/1A1A1A/euro-pound-exchange.png" 
        alt="euro-pound-exchange"/>
        <CustomNumberInput
        name={'amount'}
        style={'expenseInput'}
        max={'100000'}
        placeholder={'insert amount'}
        functionProp={functionHandler}
        />
        </div>
        <div className='payMethodBox'>
        <img 
        className='payMethodImage' 
        width="50" 
        height="50" 
        src="https://img.icons8.com/ios/50/bank-card-back-side--v1.png" 
        alt="bank-card-back-side--v1"
        onClick={()=>functionHandler({target:{name:'pay_method_id',value:2}})}/>
        <img 
        className='payMethodImage' 
        width="50" 
        height="50" 
        src="https://img.icons8.com/ios/50/banknotes.png" 
        alt="banknotes"
        onClick={()=>functionHandler({target:{name:'pay_method_id',value:1}})}/>
        </div>
        <div>
            {categories.length > 0
            ?(<div className='categoriesDesign'>
            {
                categories.map(
                    category =>{
                        return(
                            <div key={category.id} className='categoryBox' onClick={()=>functionHandler({target:{name:'category_id', value:category.id}})}>
                                <img src={category.icon_url} alt={category.name} className='categoryIcon'></img>
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
            <CustomButton 
            style={"addButton"}
            functionToDo={addExpenseFunction}
            title={"Add"}
            />
        </div>
    </Container>
    )
}