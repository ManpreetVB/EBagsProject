import { useState } from "react";
import React from "react";
import axios from "axios";
import Header from "./Header";



const Profile = () => {
    const [userID,setUserID]=useState("");

    const handleLogin = (e) =>{
        debugger
       const apiUrl='https://localhost:7229/api/Users/ViewUser?id=${userID}'; 
        const requestBody={
            "userID":userID
            
          };
          axios.get(apiUrl,requestBody)
          .then((result) =>{
            if (result.data.response.statusCode === 200)
            {
                
                
                alert(result.data.response.statusMessage)
            }
           else
           {
            alert(result.data.response.statusMessage)
           }
           })
           .catch((error)=>{
            console.log(error)
           })

        };

    return(
       <>
        <Header/>
        <div className ='container' style={{ width: "50%", margin: "0 auto" }}>
           <div className ='row'>
           <label className = 'label'>UserID</label>
           <input type = "text" className = 'form-control' placeholder='Enter UserID' onChange={(e)=>setUserID(e.target.value)}
           value={userID}/>
           </div>

           <button className = 'btn btn-primary'onClick={(e)=>handleLogin(e)} >
            {""}
           ViewUser {""}
            </button>&nbsp;
           <button className = 'btn btn-danger' >Cancel</button>&nbsp;
           </div>
           
          
       </>
    );
};
export default Profile;