import { useEffect, useState } from 'react'
import './NewExpense.css'
import { Container } from 'react-bootstrap'
import { getAllExpensesCategories } from '../../services/apiCalls'

export const NewExpense=()=>{
    const[categories,setCategories]=useState([])
    const[expenseDetails, setExpenseDetails]=useState({
        amount:'',
        category_id:'',
        description:'',
        date:'',
        pay_method_id:''
    })

    useEffect(()=>{
        if(categories.length === 0){
            getAllExpensesCategories()
            .then(result=> {
                setCategories(result.data.data)
            })
            .catch(error=>console.log(error))
        }
    })

    return(
    <Container fluid className='newExpenseDesign'>
        
        <div>
            {categories.length > 0
            ?(<div className='categoriesDesign'>
            {
                categories.map(
                    category =>{
                        return(
                            <div key={category.id} value={category.id} className='categoryBox'>
                                <img src={category.icon_url} className='categoryIcon'></img>
                                {category.name}
                            </div>
                        )
                    }
                )
            }
            </div>)
            :(<>
            No hay categorias
            </>)
            }
        </div>
    </Container>
    )
}