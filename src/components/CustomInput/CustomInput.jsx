import "./CustomInput.css"

export const CustomInput = ({placeholder, type, name, handler, statusDisabled}) => {

    return (
        <input readOnly ={statusDisabled} placeholder={placeholder} type={type} name={name}  onChange={(e) => handler(e)}></input>
    )
}