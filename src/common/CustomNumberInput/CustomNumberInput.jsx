import './CustomNumberInput.css'

export const CustomNumberInput=({name,style,max,placeholder,functionProp})=>{
    return(
    <input
         name={name}
         type='number'
         className={style}
         min='1'
         max={max}
         placeholder={placeholder}
         onChange={(e)=>functionProp(e)}
    />)
}