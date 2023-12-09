import { Container } from 'react-bootstrap'
import './Login.css'
import { useState } from 'react'

export const Login=()=>{
    const [credentials, setCredentials]=useState({
        email:'',
        password:''
    })

    const [credencialesError,setCredencialesError] =useState({
        emailError:"",
        passwordError:""
    })


    return(<Container fluid>
    </Container>)
}