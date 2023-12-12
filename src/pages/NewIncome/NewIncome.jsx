import { Container } from 'react-bootstrap'
import './NewIncome.css'
import { useEffect, useState } from 'react'
import { addIncome, getAllIncomesCategories } from '../../services/apiCalls'
import { useSelector } from 'react-redux'
import { userData } from '../userSlice'

export const NewIncome=()=>{
    const rdxCredentials=useSelector(userData)
    const token=rdxCredentials.credentials.data.token
    const [categories,setCategories]=useState([])
    const [incomeDetails,setIncomeDetails]=useState({
        amount:'',
        category_id:'',
        description:'',
        date:''
    })


    useEffect(()=>{
        if(categories.length === 0){
            getAllIncomesCategories(token)
            .then(result=>setCategories(result.data.data))
            .catch(error=>console.log(error))
        }
    },[categories])
    
    const addIncomeFunction=()=>{
        addIncome(incomeDetails,token)
        .then(results=>console.log(results))
        .cath(error=>console.log(error)) 
    }

    return(<Container fluid className='newIncomeDesign'>
        {
            categories.length > 0
            ?(<div className='categoriesIncomeDesign'>
                {categories.map(category=>{
                    return(<div key={category.id} className='categoryIncomeBox' onClick={()=>functionHandler({target:{name:'category_id', value:category.id}})}>
                        <img src={category.icon_url} alt={category.name} className='categoryIcon'></img>
                        {category.name}
                    </div>)
                })}
            </div>)
            :(<>Nothing here</>)
        }
    </Container>)
}