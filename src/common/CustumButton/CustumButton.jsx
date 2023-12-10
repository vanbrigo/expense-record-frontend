import './CustumButton.css'

export const CustumButton=({style,functionToDo,title})=>{
    return(<div 
        className={style} 
        onClick={()=>functionToDo()}>
        {title}
        </div>)
}