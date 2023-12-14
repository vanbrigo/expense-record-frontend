import { Container } from 'react-bootstrap'
import './Profile.css'
import { useEffect, useState } from 'react'
import { getUserProfile, updateUserNickname } from '../../services/apiCalls'
import { useSelector } from 'react-redux'
import { userData } from '../userSlice'
import { CustomButton } from '../../common/CustomButton/CustomButton'

export const Profile=()=>{
    const rdxCredentials=useSelector(userData)
    const token= rdxCredentials.credentials.data.token
    const [userProfile, setUserProfile]=useState()
    const [click, setClick]=useState(true)
    const functionHandler = (e) => {
        setUserProfile((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }
    useEffect(()=>{
        if(!userProfile){
            getUserProfile(token)
            .then(result=>setUserProfile(result.data.data))
            .catch(error=>console.log(error))
        }
    })

    const saveData=()=>{
        updateUserNickname(userProfile,token)
        .then(result=>{
            console.log(result)
            setClick(!click)
        })
        .catch(error=>console.log(error))
    }
    
    return(
    <Container fluid className='profileDesign'>
        {!userProfile
        ?(<>Nothing here</>)
        :(<div className='profileBox'>
            <div className='avatarBox'></div>
            <div className='nicknameBox'>
            <input 
            name='nickname'
            value={userProfile.nickname || undefined}
            disabled={click}
            onChange={(e)=>functionHandler(e)}>
            </input>
            <img width="25" height="25" 
            className='editButton'
            onClick={()=>setClick(!click)}
            src="https://img.icons8.com/parakeet-line/48/1A1A1A/pencil.png" 
            alt="pencil"/>
            </div>
        </div>)}
        <CustomButton
            style={"saveButton"}
            functionToDo={saveData}
            title={"Save"}
            />
    </Container>)
}