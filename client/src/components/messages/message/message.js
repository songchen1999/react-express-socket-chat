import React from "react";
import classes from './message.module.css'
import ReactEmoji from 'react-emoji'

const Message = (props)=>{
    let isSentByCurrentUser=false;
    const trimmedName = props.name.trim().toLowerCase();
    if(props.message.user===trimmedName){
        isSentByCurrentUser=true;
    }

    return(
        isSentByCurrentUser?(
            <div className={[classes.messageContainer,classes.justifyEnd].join(' ')} >
                <p className={[classes.sentText,classes.pr10].join(' ')}>{trimmedName}</p>
                <div className={[classes.messageBox,classes.backgroundBlue].join(' ')}>
                    <p className={[classes.messageText,classes.colorWhite].join(' ')}>
                        {ReactEmoji.emojify(props.message.text)}
                    </p>
                </div>
                <div>
                    {props.message.likes}
                </div>
            </div>
        ):
            (
                <div className={[classes.messageContainer,classes.justifyStart].join(' ') } >
                    <div >
                            {props.message.likes}
                        </div>
                    <div className={[classes.messageBox,classes.backgroundLight].join(' ')}>
                        <p className={[classes.messageText,classes.colorDark].join(' ')} >
                            {ReactEmoji.emojify(props.message.text)}
                        </p>

                    </div>

                    <p className={[classes.sentText,classes.pr10].join(' ')}>{props.message.user}</p>
                </div>

            )
    )
}

export default Message;