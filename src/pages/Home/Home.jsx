import './Home.css'
import { Container } from 'react-bootstrap'

export const Home=()=>{
    return(<Container fluid className='homeDesign'>
        <div className='leftBox'></div>
        <div className='centerBox'>
            <span className='firstLine'>Managing your finances has never been so simple and efficient.<span className='secondtLine'> The only app web that gets your money into shape.</span></span>
            
        </div>
        <div></div>
    </Container>)
}