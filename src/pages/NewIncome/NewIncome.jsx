import { Container } from 'react-bootstrap'
import './NewIncome.css'
import { useEffect, useState } from 'react'
import { addIncome, getAllIncomesCategories } from '../../services/apiCalls'
import { useSelector } from 'react-redux'
import { userData } from '../userSlice'
import { validator } from '../../services/validations'
import { CustomNumberInput } from '../../common/CustomNumberInput/CustomNumberInput'
import { CustomInput } from '../../common/CustomInput/CustomInput'
import { CustomButton } from '../../common/CustomButton/CustomButton'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

export const NewIncome=()=>{
    const rdxCredentials=useSelector(userData)
    const navigate=useNavigate()
    const token=rdxCredentials.credentials.token
    const [categories,setCategories]=useState([])
    const [click,setClick]=useState()
    const [incomeDetails,setIncomeDetails]=useState({
        amount:'',
        category_id:'',
        description:'',
        date:''
    })
    const [incomeDetailsError,setIncomeDetailsError]=useState({
        descriptionError:''
    })
    const functionHandler = (e) => {
        setIncomeDetails((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value 
        }))
        if(e.target.name==='category_id'){
            setClick(e.target.value)
        }
    }
    useEffect(()=>{
        if(categories.length === 0){
            getAllIncomesCategories(token)
            .then(result=>setCategories(result.data.data))
            .catch(error=>console.log(error))
        }
    },[categories])

    const errorCheck = (e) => {
        let error = "";
        error = validator(e.target.name, e.target.value);
    
        setIncomeDetailsError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }));
      }
    const addIncomeFunction=()=>{
        addIncome(incomeDetails,token)
        .then(results=>console.log(results))
        .catch(error=>console.log(error)) 
    }

    return(<Container fluid className='newIncomeDesign'>
        <div>
        <img 
        className='backIcon'
        onClick={()=>navigate('/home')}
        width="50" 
        height="50" 
        src="https://img.icons8.com/ios/50/1A1A1A/circled-left-2.png" 
        alt="circled-left-2"/>
        </div>
        <div className='contentIncomeBox'>
        <div className='dateBox'>
        {incomeDetails.date==''
        ?(<>Select a date</>)
        :(<>{dayjs(incomeDetails.date).format('MMMM-DD-YYYY')}</>)}
        <input
         name='date'
         type='date'
         className='inputDate'
         onChange={(e)=>functionHandler(e)}
         />
        </div>
        <div className='incomeInputBox'>
        <img width="32" 
        height="32" 
        src="https://img.icons8.com/windows/32/1A1A1A/euro-pound-exchange.png" 
        alt="euro-pound-exchange"/>
        <CustomNumberInput
        name={'amount'}
        style={'incomeInput'}
        max={'100000'}
        placeholder={'insert amount'}
        functionProp={functionHandler}
        />
        </div>
        {
            categories.length > 0
            ?(<div className='categoriesIncomeDesign'>
                {categories.map(category=>{
                    return(<div key={category.id} className={`categoryIncomeBox ${click===category.id  ? 'categorySelected' : ''}`} onClick={()=>functionHandler({target:{name:'category_id', value:category.id}})}>
                        <img src={category.icon_url} alt={category.name} className='categoryIcon'></img>
                        {category.name}
                    </div>)
                })}
            </div>)
            :(<>Nothing here</>)
        }
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
            functionToDo={addIncomeFunction}
            title={"Add"}
            />
        </div>
        </div>
    </Container>)
}