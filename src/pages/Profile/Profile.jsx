import { Container } from 'react-bootstrap'
import './Profile.css'
import { useEffect, useState } from 'react'
import { getUserProfile, updateUserNickname } from '../../services/apiCalls'
import { useDispatch, useSelector } from 'react-redux'
import { login, userData } from '../userSlice'
import { CustomButton } from '../../common/CustomButton/CustomButton'

export const Profile=()=>{
    const rdxCredentials=useSelector(userData)
    const dispatch=useDispatch()
    const token= rdxCredentials.credentials.token
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
            const dataUpdated=result.data
            dataUpdated.token=token
            dispatch(login({ credentials: dataUpdated }))
            console.log(dataUpdated)
            setClick(!click)
        })
        .catch(error=>console.log(error))
    }
    return(
    <Container fluid className='profileDesign'>
        {!userProfile
        ?(<>Nothing here</>)
        :(<div className='profileBox'>
            <div className='avatarBox'>
            <img width="96" height="96" src="https://img.icons8.com/external-anggara-basic-outline-anggara-putra/96/1A1A1A/external-Avatar-user-interface-anggara-basic-outline-anggara-putra.png" alt="external-Avatar-user-interface-anggara-basic-outline-anggara-putra"/>
            <img width="25" height="25" 
            className='editAvatarButton'
            src="https://img.icons8.com/parakeet-line/48/1A1A1A/pencil.png" 
            alt="pencil"/>
            </div>
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