import { Container } from 'react-bootstrap'
import './AllCategories.css'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userData } from '../userSlice'
import { deleteCategoryAsSuperAdmin, getAllCategories } from '../../services/apiCalls'
import { HeaderButton } from '../../common/HeaderButton/HeaderButton'

export const AllCategories=()=>{
    const [categories, setCategories]=useState([])
    const rdxCredentials=useSelector(userData)
    const token=rdxCredentials.credentials.token
    const [msgDelete, setMsgDelete]=useState('')
    useEffect(()=>{
        if(categories.length===0){
            getAllCategories(token)
            .then(result=>{
                setCategories(result.data.data)
            })
            .catch(error=>console.log(error))
        }
    })
    const deleteCategory=(id)=>{
        deleteCategoryAsSuperAdmin(id,token)
        .then(result=>{
            setMsgDelete(result.data.message)
            setCategories([])
        })
        .catch(error=>console.log(error))
    }
    return(<Container fluid className='allCategoriesDesign'>
        <span className='viewNameSuperAdmin'>CATEGORIES</span>
        <HeaderButton path="/" title="Add category" />
        {/* <div>{msgDelete}</div> */}
        {categories.length > 0
        ?(<div className='allCategoriesBox'>
        {categories.map(category=>{
            return(<div className='categoryBoxSuperAdmin' key={category.id}>
                <div className="boxInsideCategories">{category.name}</div>
                <div className="boxInsideCategories">{category.type}</div>
                <div className="boxInsideCategories"><img 
                        width="24" 
                        height="24" 
                        src={category.icon_url}
                        alt="waste"/></div>
                <div className="boxInsideCategories iconDeleteCategory">
                    <img 
                        onClick={()=>deleteCategory(category.id)}
                        className='deleteIcon'
                        width="24" 
                        height="24" 
                        src="https://img.icons8.com/material-outlined/24/1A1A1A/waste.png" 
                        alt="waste"/> 
                </div>
                </div>
                )
        })}
        </div>)
        :(<></>)}
    </Container>)
}