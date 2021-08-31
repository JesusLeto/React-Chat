import React, {useContext, useState} from "react";
import CheckReginster from "../contex/contex";

const RegisterPage = ({socket}) => {
    const {SetStartChat} = useContext(CheckReginster);
    const [Name, setName] = useState("");
    const [Room, setRoom] = useState("")

    const CheckInput = () => {
       if(Name && Room){
        socket.emit("Join_room", {
            Name: Name,
            Room: Room
        })
        setName("")
        setRoom("")
        SetStartChat(true)
       }

       else{
           console.log("Error Input")
       }
    }
    

    return(
        <div className = "RegisterPage">
            <span>UserName</span>
            <input type="text" className = "RegisterPage--Name"
            value = {Name}
            onChange = {e => setName(e.target.value)}/>

            <span>Room Name</span>
            <input type="text" className = "RegisterPage--Room"
            value = {Room}
            onChange = {e => setRoom(e.target.value)}/>

            <button className = "RegisterPage--Btn"
            onClick = {CheckInput}>Sing ig</button>
        </div>
    )
}

export default RegisterPage;