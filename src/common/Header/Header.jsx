import { Container } from "react-bootstrap"
import "./Header.css"
import { HeaderButton } from "../HeaderButton/HeaderButton"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { logout, userData } from "../../pages/userSlice"

export const Header=()=>{
    const rdxCredentials=useSelector(userData)
    const token=rdxCredentials.credentials.token
    const navigate=useNavigate()
    console.log(rdxCredentials.credentials.data.nickname)
    const logOutMe = () => {
        dispatch(logout( {credentials : ""}))
      }
    return(
        <Container fluid className="headerDesign">
            <div className="logoHeader" onClick={()=>navigate('/')}></div>
            <div className="headerBox">
            {!token 
            ?(<>
            <HeaderButton 
            path='/register'
            title='SIGN IN'
            />
            <HeaderButton 
            path='/login'
            title='LOG IN'
            />
            </>) 
            :(<>
            <HeaderButton 
            path='/profile'
            title={`Welcome, ${rdxCredentials.credentials.data.nickname}`}
            />
            <HeaderButton 
            path='/home'
            title=' My balance'
            />
            <HeaderButton 
            path='/'
            title='My record'
            />
            <div onClick={logOutMe}>
            <HeaderButton 
            path={"/"} 
            title={"Log out"} 
            />  
            </div>
            </>)}
            
            </div>
        </Container>
    )
}