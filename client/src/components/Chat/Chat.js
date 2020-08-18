import React, {useState,useEffect} from "react";
import queryString from 'query-string';
import io from 'socket.io-client';
import classes from './index.module.css'
import InfoBar from "../InforBar/InfoBar";
import Input from '../Input/Input'
import Messages from '../messages/messages'
import UsersInRoom from "../UsersinRoom/UsersinRoom";

let socket;

const Chat = (props)=>{
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const [message,setMessage] = useState('');
    const [messages,setMessages] =useState([])
    const [users,setUsers] = useState([]);
    const ENDPOINT = "http://localhost:5000"
    useEffect(()=>{

        const { name, room } = queryString.parse(props.location.search);
        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);
        // send join message to the sever
        socket.emit('join',{name,room}, (error)=>{alert(error); props.history.goBack()});
        return ()=>{
            // send disconnect message to the server
            socket.emit('disconnect');
            socket.off();
        }

    },[ENDPOINT, props.location.search])

    useEffect(()=>{
        console.log("useEffect Chat 2nd")
        //listen for message event
        socket.on('message',(message)=>{
            setMessages([...messages,message]);

        }, [messages])
        // listen for roomData event
        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
        // listen for loveback event
        socket.on("loveback",(message)=>{
            // find the index to update
            let index = messages.findIndex(e=>(e.text==message.text && e.user==message.user));
           // make a dup messages array
            let dupMess = messages.map(e=>e);
            // update that message
            if(index>=0){
                dupMess[index] = message;
            }

           setMessages(dupMess);
            //alert(dupMess[index].user);
        })


    })

    const sendMessage= (event)=>{
        event.preventDefault();

        if(message){
            // send sendMessage event
            socket.emit('sendMessage',message,()=>setMessage(''))
        }
    }

    // testing for liking a message
    const like = ()=>{
        return (message)=>{
            socket.emit('like',message);
        }
    }



    return (
        <div className={classes.outerContainer}>
            <div className={classes.container}>
                <InfoBar room={room}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
                <Messages messages={messages} name={name} like={like}/>
                <UsersInRoom users={users}/>
            </div>
        </div>
    )
}

export default Chat;