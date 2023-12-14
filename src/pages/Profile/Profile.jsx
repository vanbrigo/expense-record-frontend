import { Container } from 'react-bootstrap'
import './Profile.css'
import { useState } from 'react'

export const Profile=()=>{
    const [userProfile, setUserProfile]=useState()

    return(
    <Container fluid className='profileDesign'>
        {!userProfile
        ?(<>Nothing here</>)
        :(<>Hola</>)
    }
    </Container>)
}