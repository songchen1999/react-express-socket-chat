import React from "react";
import classes from './messages.module.css'
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from './message/message'

const Messages = (props)=>(
    <ScrollToBottom className={classes.messages}>
        {props.messages.map(
            (message,i)=>(
                // liking a message by adding a onClick
                <div key={i} onClick={()=>{props.like()(message)}}>
                    <Message message={message} name={props.name}/>
                </div>
            )

        )}
    </ScrollToBottom>
)

export default Messages