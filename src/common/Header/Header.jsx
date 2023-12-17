import { Container } from "react-bootstrap"
import "./Header.css"
import { HeaderButton } from "../HeaderButton/HeaderButton"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout, userData } from "../../pages/userSlice"

export const Header=()=>{
    const rdxCredentials=useSelector(userData)
    const token=rdxCredentials.credentials.token
    const user=rdxCredentials.credentials.data
    const dispatch=useDispatch()
    const navigate=useNavigate()
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
            title='Sign in'
            />
            <HeaderButton 
            path='/login'
            title='Log in'
            />
            </>) 
            :(<>
            {user.role==='super_admin'
            ?(<>
            {user.role}
            <HeaderButton 
            path='/'
            title='Users'
            />
            <HeaderButton 
            path='/'
            title='Categories'
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
            </>)}
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