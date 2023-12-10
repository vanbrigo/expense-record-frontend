import { Container } from 'react-bootstrap'
import './Register.css'
import { useState } from 'react'
import { CustomInput } from '../../common/CustomInput/CustomInput'
import { validator } from '../../services/validations'
import { registerUser } from '../../services/apiCalls'
import { CustomButton } from '../../common/CustomButton/CustomButton'

export const Register=()=>{
    const [credentials, setCredentials]=useState({
        nickname:'',
        email:'',
        password:''
    })
    const [credentialsError,setCredentialsError]=useState({
        nicknameError:'',
        emailError:'',
        passwordError:''
    })
    const functionHandler = (e) => {
        setCredentials((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }
    const errorCheck = (e) => {
        let error = "";
        error = validator(e.target.name, e.target.value);
    
        setCredentialsError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }));
      }
      const signIn =() =>{
        registerUser(credentials)
        .then(
            resultado=> {
            console.log(resultado.data)

    })
        .catch(error=> console.log(error))
    }
    return(
        <Container fluid>
        <CustomInput
          name={"nickname"}
          type={"nickname"}
          style={`loginInputDesign ${credentialsError.nicknameError !== "" ? "inputError" : ""}`}
          lenght={"30"}
          placeholder={"nickname"}
          functionProp={functionHandler}
          functionCheck={errorCheck}
        />
        <div className="errorText">{credentialsError.nicknameError}</div>
        <CustomInput
          name={"email"}
          type={"email"}
          style={`loginInputDesign ${credentialsError.emailError !== "" ? "inputError" : ""}`}
          lenght={"30"}
          placeholder={"email"}
          functionProp={functionHandler}
          functionCheck={errorCheck}
        />
        <div className="errorText">{credentialsError.emailError}</div>
        <CustomInput
          name={"password"}
          type={"password"}
          style={`loginInputDesign ${credentialsError.passwordError !== "" ? "inputError" : ""}`}
          lenght={"30"}
          placeholder={"password"}
          functionProp={functionHandler}
          functionCheck={errorCheck}
        />
        <div className="errorText">{credentialsError.passwordError}</div>
        <CustomButton
            style={"loginButton signUpButton"}
            functionToDo={signIn}
            title={"Sign up"}
            />
        </Container>
    )
}