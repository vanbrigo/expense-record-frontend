import './CustomButton.css'

export const CustomButton=({style,functionToDo,title})=>{
    return(<div 
        className={style} 
        onClick={()=>functionToDo()}>
        {title}
        </div>)
}