import React from "react";
import classes from './InfoBar.module.css'
import unicorn from '../../icons/onlineIcon.png'
import close from '../../icons/close-512.png'
const InfoBar = ({room})=>(
    <div className={classes.infoBar}>
        <div className={classes.leftInnerContainer}>
            <img src={unicorn} alt="onlineImage" className={classes.onlineIcon}/>
            <h3>{room}</h3>
        </div>
        <div className={classes.rightInnerContainer}>
            <a href="/"><img src={close} alt="close" className={classes.closeIcon}/></a>
        </div>
    </div>
)

export default InfoBar;