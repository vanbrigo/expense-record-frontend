import { Container } from 'react-bootstrap'
import './Register.css'
import { useState } from 'react'

export const Register=()=>{
    const [credentials, setCredentials]=useState({
        nickname:'',
        email:'',
        password:''
    })
    return(
        <Container fluid>

        </Container>
    )
}