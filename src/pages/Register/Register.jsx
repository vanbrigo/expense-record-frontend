import { Container } from 'react-bootstrap'
import './Register.css'
import { useState } from 'react'
import { CustomInput } from '../../common/CustomInput/CustomInput'
import { validator } from '../../services/validations'
import { registerUser } from '../../services/apiCalls'
import { CustomButton } from '../../common/CustomButton/CustomButton'
import { useNavigate } from 'react-router-dom'

export const Register=()=>{
    const navigate=useNavigate()
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
        <Container fluid className='registerDesign'>
        <div className='registerBox'>
            <span className='registerName'>Sign up to <span className='xpensesName'>Xpenses</span></span>
            <span>Have an account? <span className='loginHereText' onClick={()=>navigate('/login')}>Login here!</span></span>
        <CustomInput
          name={"nickname"}
          type={"nickname"}
          style={`loginInputDesign ${credentialsError.nicknameError !== "" ? "inputError" : ""}`}
          lenght={"30"}
          placeholder={"Nickname"}
          functionProp={functionHandler}
          functionCheck={errorCheck}
        />
        <div className="errorText">{credentialsError.nicknameError}</div>
        <CustomInput
          name={"email"}
          type={"email"}
          style={`loginInputDesign ${credentialsError.emailError !== "" ? "inputError" : ""}`}
          lenght={"30"}
          placeholder={"Email address"}
          functionProp={functionHandler}
          functionCheck={errorCheck}
        />
        <div className="errorText">{credentialsError.emailError}</div>
        <CustomInput
          name={"password"}
          type={"password"}
          style={`loginInputDesign ${credentialsError.passwordError !== "" ? "inputError" : ""}`}
          lenght={"30"}
          placeholder={"Password"}
          functionProp={functionHandler}
          functionCheck={errorCheck}
        />
        <div className="errorText">{credentialsError.passwordError}</div>
        <CustomButton
            style={"loginButton signUpButton"}
            functionToDo={signIn}
            title={"Sign up"}
            />
        </div>
        </Container>
    )
}