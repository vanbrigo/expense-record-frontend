import { Routes,Route, Navigate} from "react-router-dom";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";



export const Body=()=>{
    return(
        <>
        <Routes>
            <Route path="*" element={<Navigate to='/'/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
        </Routes>
        </>
    )
}