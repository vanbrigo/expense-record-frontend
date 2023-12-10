import './CustomInput.css'

export const CustomInput=({name,type,style,lenght,placeholder,functionProp,functionCheck})=>{
    return(
    <input
         name={name}
         type={type}
         className={style}
         maxLength={lenght}
         placeholder={placeholder}
         onChange={(e)=>functionProp(e)}
         onBlur={(e)=>functionCheck(e)}
    />)
}