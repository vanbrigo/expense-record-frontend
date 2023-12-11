import { Routes,Route, Navigate} from "react-router-dom";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { NewExpense } from "../NewExpense/NewExpense";



export const Body=()=>{
    return(
        <>
        <Routes>
            <Route path="*" element={<Navigate to='/'/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/new-expense" element={<NewExpense />}/>
        </Routes>
        </>
    )
}