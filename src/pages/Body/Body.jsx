import { Navigate, Route, Routes } from "react-router-dom"
import { Register } from "../Register/Register"
import { Home } from "../Home/Home"
import { Profile } from "../Profile/Profile"
import { Admin } from "../Admin/Admin"
import { Login } from "../login/login"
import { Login_artist } from "../Login_Employees/Login_Employees"
import { Appointments } from "../Appointments/Appointments"
import { Artist_profile } from "../Artist_Profile/Artist_Profile"

export const Body = () => {

    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/artistLogin" element={<Login_artist />} />
                <Route path="/artistProfile" element={<Artist_profile />} />

                <Route path="/admin" element={<Admin />} />
                
            </Routes>
        </>
    )
}