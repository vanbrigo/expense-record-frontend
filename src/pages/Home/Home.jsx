import './Home.css'
import { Container, Row } from 'react-bootstrap'

export const Home=()=>{
    return(<Container fluid className='homeDesign'>
        <Row className='homeFirstRow'>
        <div className='leftBox'></div>
        <div className='centerBox'>
            <span className='firstLine'>Managing your finances has never been so simple and efficient.<span className='secondtLine'> The only app web that gets your money into shape.</span></span>
            
        </div>
        </Row>
        <Row className='homeFooterRow'>
            <div className='footerBox'></div>
            <div className='footerBox'>
            <img width="55" height="55" src="https://img.icons8.com/glyph-neue/64/1A1A1A/twitter-circled.png" alt="twitter-circled"/>
            <img width="52" height="52" src="https://img.icons8.com/ios-filled/50/1A1A1A/circled-envelope.png" alt="circled-envelope"/>
            <img width="55" height="55" src="https://img.icons8.com/glyph-neue/64/000000/facebook-circled.png" alt="facebook-circled"/>
            </div>
        </Row>
    </Container>)
}