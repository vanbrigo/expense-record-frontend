import { Container } from "react-bootstrap"
import "./Header.css"
import { HeaderButton } from "../HeaderButton/HeaderButton"

export const Header=()=>{
    return(
        <Container fluid className="headerDesign">
            <div className="logoHeader"></div>
            <div className="headerBox">
            <HeaderButton 
            path='/register'
            title='SIGN IN'
            />
            <HeaderButton 
            path='/login'
            title='LOG IN'
            />
            </div>
        </Container>
    )
}