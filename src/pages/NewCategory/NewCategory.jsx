import { Container } from 'react-bootstrap'
import './NewCategory.css'
import { useState } from 'react'
import { CustomInput } from '../../common/CustomInput/CustomInput'
import { CustomButton } from '../../common/CustomButton/CustomButton'
import { createCategory } from '../../services/apiCalls'
import { useSelector } from 'react-redux'
import { userData } from '../userSlice'
import { useNavigate } from 'react-router-dom'

export const NewCategory=()=>{
    const rdxCredentials=useSelector(userData)
    const token=rdxCredentials.credentials.token
    const navigate=useNavigate()
    const [msg, setMsg]=useState('')
    const [categoryDetails,setCategoryDetails]=useState({
        name:'',
        type:'',
        icon_url:''
    })
    const functionHandler = (e) => {
        setCategoryDetails((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }
    const errorCheck = (e) => {
        console.log(entro)
        // let error = "";
        // error = validator(e.target.name, e.target.value);
    
        // setCredentialsError((prevState) => ({
        //     ...prevState,
        //     [e.target.name + 'Error']: error,
        // }));
      }
      const saveData=()=>{
        createCategory(categoryDetails,token)
        .then(result=>{
            setMsg(result.data.message)
                setTimeout(()=>{
                    navigate('/categories')
                }, 2000);
        })
        .catch(error=>console.log(error))
    }
    return(<Container fluid className='newCategoryDesign'>
        <CustomInput
          name={"name"}
          type={"text"}
          style={'nameInputCategory'}
          lenght={"15"}
          placeholder={"Name"}
          functionProp={functionHandler}
          functionCheck={errorCheck}
        />
        <CustomInput
          name={"icon_url"}
          type={"text"}
          style={'nameInputCategory'}
          lenght={"100"}
          placeholder={"url"}
          functionProp={functionHandler}
          functionCheck={errorCheck}
        />
        <select name='type' onChange={functionHandler}>
            <option>Select a type</option>
            <option>Income</option>
            <option>Expense</option>
        </select>
        <CustomButton
            style={'saveButton'}
            functionToDo={saveData}
            title={"Save"}
            />
        {msg==="Category created successfully" && 
           <div>¡Category created successfully!</div>
        }
    </Container>)
}