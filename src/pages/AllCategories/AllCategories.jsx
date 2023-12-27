import { Container } from 'react-bootstrap'
import './AllCategories.css'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userData } from '../userSlice'
import { activateCategory, deleteCategoryAsSuperAdmin, getAllCategories, inactivateCategory } from '../../services/apiCalls'
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
            setTimeout(()=>{
                setCategories([])
            }, 2000);
        })
        .catch(error=>{
            console.log(error)
            if(error.response.data.message==='Cannot delete the category. It is referenced in another table.'){
                setMsgDelete('Cannot delete the category')
                setTimeout(()=>{
                    setMsgDelete('')
                }, 1500);
            }
        })
    }
    const changeCategoryState=(id,categoryActive)=>{
        if(categoryActive===1){
            inactivateCategory(id,token)
            .then(result=>{
                setCategories([])
            })
            .catch(error=>console.log(error))
        }else if(categoryActive===0){
            activateCategory(id,token)
            .then(result=>{
                setCategories([])
            })
            .catch(error=>console.log(error))
        }
    }
    return(<Container fluid className='allCategoriesDesign'>
        <span className='viewNameSuperAdmin'>CATEGORIES</span>
        <HeaderButton path="/new-category" title="Add category" />
        <div className='msgDeleteCategories'>{msgDelete}</div>
        {categories.length > 0
        ?(<div className='allCategoriesBox'>
        {categories.map(category=>{
            return(<div className='categoryBoxSuperAdmin' key={category.id}>
                <div className="boxInsideCategories">{category.name}</div>
                <div className="boxInsideCategories">{category.type}</div>
                <div className="boxInsideCategories iconAllCategories">
                    <img 
                    width="24" 
                    height="24" 
                    src={category.icon_url}
                    alt="waste"/>
                </div>
                <div className="boxInsideCategories iconDeleteCategory">
                    {category.is_active=== 1 ? <>Active</> : <>Inactive</>}
                    <input
                    type="checkbox"
                    checked={category.is_active}
                    onChange={() =>
                      changeCategoryState(category.id, category.is_active)
                    }
                    ></input>
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