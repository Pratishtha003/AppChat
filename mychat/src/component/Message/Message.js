import React from 'react'
import './Message.css'
const Message = ({user1,message,classs}) => {
    if(user1){
        return(
            <div className={`messageBox ${classs}`}>
                {`${user1}:${message}`}
            </div>
        )
    }
    else{
        return (
        <div className={`messageBox ${classs}`}>
            {`You: ${message}`}
        </div>
        )
    }
}

export default Message