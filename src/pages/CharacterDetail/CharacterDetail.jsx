import { useEffect } from "react"
import { bringUserById } from "../../services/apiCalls"

export const CharacterDetail = () => {

 
    const id = localStorage.getItem('userId')

    useEffect(() => {
        bringUserById(id)
        .then((res) => {
            console.log(res)
        })
    }, [])

}