import { Container } from 'react-bootstrap'
import './AllUsers.css'
import { useEffect, useState } from 'react'
import { activateUser, getAllUsers, inactivateUser } from '../../services/apiCalls'
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

    const changeUserState=(id,userActive)=>{
        if(userActive===1){
            inactivateUser(id,token)
            .then(result=>{
                setUsers([])
            })
            .catch(error=>console.log(error))
        }else if(userActive===0){
            activateUser(id,token)
            .then(result=>{
                setUsers([])
            })
            .catch(error=>console.log(error))
        }
    }

    return(<Container fluid className='allUsersdesign'>
        {
            users.length > 0 
            ?(<div className='allUsersBox'>
            {users.map(user=>{
                return (
                  <div className="userBox" key={user.id}>
                    <div className="boxInside">{user.nickname}</div>
                    <div className="boxInside">{user.email}</div>
                    <div className="boxInside boxIsActive">
                      {user.is_active === 1 ? <>Active</> : <>Inactive</>}
                    </div>
                    <div className="boxInside iconDeleteUser">
                        <input type='checkbox' checked={user.is_active} onChange={()=>changeUserState(user.id,user.is_active)}></input>
                      {/* <img 
                        onClick={()=>deleteUser()}
                        className='deleteIcon'
                        width="24" 
                        height="24" 
                        src="https://img.icons8.com/material-outlined/24/1A1A1A/waste.png" 
                        alt="waste"/> */}
                    </div>
                  </div>
                );
            })}
            </div>)
            :(<></>)

        }
        
    </Container>)
}