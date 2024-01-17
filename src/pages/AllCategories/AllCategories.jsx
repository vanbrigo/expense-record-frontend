import { Container } from 'react-bootstrap'
import './AllCategories.css'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userData } from '../userSlice'
import { activateCategory, deleteCategoryAsSuperAdmin, getAllCategories, inactivateCategory } from '../../services/apiCalls'
import { HeaderButton } from '../../common/HeaderButton/HeaderButton'
import { CustomButton } from '../../common/CustomButton/CustomButton'
import { useNavigate } from 'react-router-dom'

export const AllCategories=()=>{
    const [categories, setCategories]=useState([])
    const rdxCredentials=useSelector(userData)
    const navigate= useNavigate()
    const token=rdxCredentials.credentials.token
    const [iconClick, setIconClick]=useState(false)
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
        {iconClick &&
            <div 
            className='modalEditIconDesign'
            onClick={()=>setIconClick(!iconClick)}>
                <div className='modalEditIconBox'>Vanessa
                <div>
        <img 
        className='backIcon'
        onClick={()=>navigate('/categories')}
        width="50" 
        height="50" 
        src="https://img.icons8.com/ios/50/1A1A1A/circled-left-2.png" 
        alt="circled-left-2"/>
        </div>
                </div>
            </div>}
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
                    alt="waste"
                    onClick={()=>setIconClick(!iconClick)}
                    />
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