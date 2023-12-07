import { useNavigate } from 'react-router-dom'
import './HeaderButton.css'


export const HeaderButton=(path,title)=>{
    const navigate=useNavigate()
    return(
        <div className='headerButtonDesign' onClick={()=>navigate(path)}>
            {title}
        </div>
    )
}