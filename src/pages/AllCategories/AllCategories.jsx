import { Container } from 'react-bootstrap'
import './AllCategories.css'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userData } from '../userSlice'
import { getAllCategories } from '../../services/apiCalls'

export const AllCategories=()=>{
    const [categories, setCategories]=useState([])
    const rdxCredentials=useSelector(userData)
    const token=rdxCredentials.credentials.token
    useEffect(()=>{
        if(categories.length===0){
            getAllCategories(token)
            .then(result=>{
                setCategories(result.data.data)
            })
            .catch(error=>console.log(error))
        }
    })

    return(<Container fluid className='allCategoriesDesign'>
        {categories.length > 0
        ?(<>
        {categories.map(category=>{
            return(<div key={category.id}>{category.name}</div>)
        })}
        </>)
        :(<></>)}
    </Container>)
}