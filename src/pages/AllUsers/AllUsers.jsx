import { Container } from 'react-bootstrap'
import './AllUsers.css'
import { useEffect, useState } from 'react'
import { getAllUsers } from '../../services/apiCalls'
import { useSelector } from 'react-redux'
import { userData } from '../userSlice'

export const AllUsers=()=>{
    const [users,setUsers]=useState([])
    const rdxCredentials=useSelector(userData)
    const token=rdxCredentials.credentials.token
    useEffect(()=>{
        if(users.length===0){
            getAllUsers(token)
            .then(result=>setUsers(result.data.data))
            .catch(error=>console.log(error))
        }
    },[users])

    return(<Container fluid className='allUsersdesign'>
        {
            users.length > 0 
            ?(<>
            {users.map(user=>{
                return(<div key={user.id}>{user.nickname}</div>)
            })}
            </>)
            :(<></>)

        }
    </Container>)
}