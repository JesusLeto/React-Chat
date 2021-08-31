import React, {useState, useRef} from "react";
import "./ChatStyle.scss"



const ChatPage = ({socket}) => {
    

    const [MessageList, setMessageList] = useState([])
    const [Message, setMessage] = useState("")
    const [MainId, setMainId] = useState(null)

    socket.once("Responce_Message", ({message, id}) => {
        setMessageList([...MessageList, {
            message: message,
            own: MainId === id ? true: false
        }])
        BlockMessage.current.scrollTop = BlockMessage.current.scrollHeight
    })

    socket.on("HostId", ({HostId}) =>{
        setMainId(HostId)
    })

    const SendMessage = () => {
        socket.emit("New_Message", {
            message : Message
        })
        setMessage("")
    }

    const BlockMessage = useRef()

    return(
        <div className = "ChatPage">

            <div className="Message--block" ref = {BlockMessage}>
            {
            MessageList.map((Element, i) => {
                return <div className="Message--Wrapper" key = {i} >
                    <div className = {`Message--Element ${Element.own ? `MyMessage`: `NMyMessage`}` }>{`${Element.message}`}</div>
                </div>
            })
            }
            </div>
            
            <div className="Message--input">
                <input type="text" className = "InputMessage"
                value = {Message}
                onChange = {e => setMessage(e.target.value)}/>
                <button className = "ChatPage--Btn"
                onClick = {SendMessage}>Send Message</button>
            </div>

           
        </div>
    )
}

export default ChatPage