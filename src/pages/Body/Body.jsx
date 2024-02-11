import { Navigate, Route, Routes } from "react-router-dom"
import { Register } from "../Register/Register"
import { Home } from "../Home/Home"
import { CharacterDetail } from "../CharacterDetail/CharacterDetail"
import { Profile } from "../Profile/Profile"
import { Admin } from "../Admin/Admin"
import { Login } from "../login/login"
import { Login2 } from "../login2/login2"

export const Body = () => {

    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/login2" element={<Login2 />} />
                <Route path="/characterdetail" element={<CharacterDetail />} />
                <Route path="/admin" element={<Admin />} />
                
            </Routes>
        </>
    )
}