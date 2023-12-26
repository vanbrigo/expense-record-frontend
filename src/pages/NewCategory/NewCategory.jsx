import { Container } from 'react-bootstrap'
import './NewCategory.css'
import { useState } from 'react'
import { CustomInput } from '../../common/CustomInput/CustomInput'
import { CustomButton } from '../../common/CustomButton/CustomButton'

export const NewCategory=()=>{
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
        // updateUserNickname(userProfile,token)
        // .then(result=>{
        //     const dataUpdated=result.data
        //     dataUpdated.token=token
        //     dispatch(login({ credentials: dataUpdated }))
        //     setClick(!click)
        // })
        // .catch(error=>console.log(error))
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
    </Container>)
}