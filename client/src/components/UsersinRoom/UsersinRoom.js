import React from "react";
import classes from './UsersinRoom.module.css'

const UsersInRoom = (props)=>{
    return (
        <div className={classes.UsersInRoom}>
            <p>Users: {props.users.map(user=>user.name).join(', ')}</p>

        </div>
        )
}

export default UsersInRoom;