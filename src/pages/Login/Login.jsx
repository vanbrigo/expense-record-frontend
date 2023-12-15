import { Container } from 'react-bootstrap'
import './Login.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CustomInput } from '../../common/CustomInput/CustomInput'
import { validator } from '../../services/validations'
import { login, userData } from "../userSlice"
import { CustomButton } from '../../common/CustomButton/CustomButton'
import { logUser } from '../../services/apiCalls'
import { useNavigate } from 'react-router-dom'

export const Login=()=>{
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const [credentials, setCredentials]=useState({
        email:'',
        password:''
    })
    const [credentialsError,setCredentialsError] =useState({
        emailError:"",
        passwordError:""
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
      const logIn =() =>{
        logUser(credentials)
        .then(
            resultado=> {
                dispatch(login({ credentials: resultado.data }))
            navigate("/")
    })
        .catch(error=> console.log(error))
    }
    return (
      <Container fluid className='loginDesign'>
        <div className='loginBox'>
            <span className='loginName'>Login to <span className='xpensesName'>Xpenses</span></span>
            <span>Don't have an account yet? <span className='signUpHereText' onClick={()=>navigate('/register')}>Sign Up here!</span></span>
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
          lenght={"12"}
          placeholder={"Password"}
          functionProp={functionHandler}
          functionCheck={errorCheck}
        />
        <div className="errorText">{credentialsError.passwordError}</div>
        <CustomButton
            style={"loginButton"}
            functionToDo={logIn}
            title={"Log in"}
            />
        </div>
      </Container>
    );
}