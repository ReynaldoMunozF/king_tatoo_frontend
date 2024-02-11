import { useEffect, useState } from "react"
import { CustomInput } from "../../components/CustomInput/CustomInput"
import { useNavigate } from "react-router-dom"

export const Register = () => {

    const [userData, setUserData] = useState({
        name: '',
        email:'',
        password: ''
    })

    const navigate = useNavigate()

    const inputHandler = (event) => {
        setUserData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    useEffect (() => {
        console.log('hemos pasado por register, pero teníamos prisa')
        // navigate('/')
    }, [])

    return (
        <div className="miDiv">
            <CustomInput type={"text"} name={"name"} handler={inputHandler} ></CustomInput>
            <CustomInput type={"email"} name={"email"} handler={inputHandler} ></CustomInput>
            <CustomInput type={"password"} name={"password"} handler={inputHandler} ></CustomInput>
            <h1>patata</h1>
        </div>
    )
}