// import React,{useState} from 'react';
// import "./join.css";
// import { Link } from 'react-router-dom'; // adjust the import statement based on your library

// let user1;


// const sendUser1=()=>{
//     user1 = document.getElementById('joinInput').value;
//     document.getElementById('joinInput').value="";
// }

// const Join = () => {

//   const [name, setname] = useState("");

//   return (
//     <div className="JoinPage">
//         <div className='JoinContainer'>
//           <img src="https://imagensemoldes.com.br/wp-content/uploads/2020/07/Cartoon-Cat-PNG.png" alt="logo"/>   
//           <h1>MyChat</h1>
//           <input onChange={(e)=>setname(e.target.value)} type="text" id="joinInput" placeholder='Enter Your Name'/>
//           <Link onClick={(e)=>!name?e.preventDefault():null}to='/chat'><button onClick={sendUser1} className='joinbtn'>Login In</button></Link>
//           {/* prevent default will help not to load the next page if name is not present */}
//         </div>
//     </div>
//   )
// }

// export default Join;
// export {user1};


import React,{useState} from 'react';
import "./join.css";
import { Link } from 'react-router-dom'; // adjust the import statement based on your library

let user1;
let room1;//

const sendUser1=()=>{
    user1 = document.getElementById('joinInput').value;
    document.getElementById('joinInput').value="";
}

const sendRoomName=()=>{
  room1 = document.getElementById('room_name').value;
  document.getElementById('room_name').value="";
}


const Join = () => {

  const [name, setname] = useState("");
  const [roomName,setRoom] =useState("");//
  return (
    <div className="JoinPage">
        <div className='JoinContainer'>
          <img src="https://imagensemoldes.com.br/wp-content/uploads/2020/07/Cartoon-Cat-PNG.png" alt="logo"/>   
          <h1>MyChat</h1>
          <input onChange={(e)=>setname(e.target.value)} type="text" id="joinInput" placeholder='Enter Your Name'/>
          <input onChange={(e)=>setRoom(e.target.value)} type='text' id='room_name' placeholder='Enter Room Name'/>  {/**/}
          <Link onClick={(e)=>!name || !roomName ?e.preventDefault():null}to='/chat'><button onClick={()=>{sendUser1();sendRoomName();}} className='joinbtn'>Login In</button></Link> {/**/}
         
        </div>
    </div>
  )
}

export default Join;
export {user1};
export{room1};






