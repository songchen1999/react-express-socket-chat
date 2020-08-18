import React from "react";
import classes from './Input.module.css';

const Input = (props)=>(
    <form className={classes.form}>
        <input type="text"
               className={classes.input}
        placeholder='Type a message...'
               value={props.message}
               onChange={(event)=>props.setMessage(event.target.value)}
               onKeyPress={event=>event.key==='Enter'?props.sendMessage(event):null}
        />
        <button className={classes.sendButton}
        onClick={(event)=>props.sendMessage(event)}
        >Send</button>

    </form>


)


export default Input