import { Routes,Route, Navigate} from "react-router-dom";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { NewExpense } from "../NewExpense/NewExpense";
import { NewIncome } from "../NewIncome/NewIncome";
import { HomeBalance } from "../HomeBalance/HomeBalance";
import { Profile } from "../Profile/Profile";
import { BalanceSheets } from "../BalanceSheets/BalanceSheets";
import { Home } from "../Home/Home";
import { AllUsers } from "../AllUsers/AllUsers";
import { AllCategories } from "../AllCategories/AllCategories";
import { MyIncomes } from "../MyIncomes/MyIncomes";



export const Body=()=>{
    return(
        <>
        <Routes>
            <Route path="*" element={<Navigate to='/'/>}/>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/home" element={<HomeBalance />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/new-expense" element={<NewExpense />}/>
            <Route path="/new-income" element={<NewIncome />}/>
            <Route path="/my-incomes" element={<MyIncomes />}/>
            <Route path="/my-record" element={<BalanceSheets />}/>
            <Route path="/all-users" element={<AllUsers />}/>
            <Route path="/categories" element={<AllCategories />}/>
        </Routes>
        </>
    )
}