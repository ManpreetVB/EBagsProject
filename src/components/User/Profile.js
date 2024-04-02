import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import Header from "./Header";
import { baseUrl } from "../constant";


const Profile = () => {
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName]=useState("");
    const [email,setEmail]= useState("");
    const[password,setPassword]= useState("");

    useEffect(() =>{
        getData();
    },[]);

    const getData = () =>{
        const data={
            Email:localStorage.getItem("username"),

        };
        const url=`${baseUrl}https://localhost:7229/api/Users/ViewUser`;
        axios.post(url,data)
        .then((result) =>{
            const data= result.data;
            if (data.statusCode==200){
                setFirstName(data.user.firstName);
                setLastName(data.user.lastName);
                setEmail(data.user.email);
                setPassword(data.user.password);

            }
        })
        .catch((error)=>{
            console.log(error);
        });

    };
    const handleUploadFile=async (e)=>{
        e.preventDefault();
        const data={
            FirstName:firstName,
            LastName:lastName,
            Email:email,
            Password:password,
            actionType:'Update'
        };
        const res=await axios.post(
          `${baseUrl}/https://localhost:7229/api/Users/ UpdateUserProfile`  ,data
        );
        if (res.data.statusCode==200){
            getData();
            Clear(e);
            alert("Profile updated successfully");

        }
        else{
            alert(res.data.statusMessage);
        }
    };

    const Clear=() =>{
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
    }
  
    return(
        <>
        <Header/>
        <div className="container" style={{ width: "50%", margin: "0 auto" }}>
        <div className="row">
        <label className="label">FirstName</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter First Name"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
      </div>


      
        <div className="row">
        <label className="label">LastName</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Last Name"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
      </div>
     
      
        <div className="row">
        <label className="label">Email</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
   
      
        <div className="row">
        <label className="label">Password</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Password "
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      <div className="row">
        <button className="btn btn-primary "onClick={(e)=> handleUploadFile(e)}>
          {" "}
          Update{" "}
        </button>&nbsp;
        <button className="btn btn-danger"onClick={(e)=> handleUploadFile(e)}>
          {" "}
          Reset{" "}
        </button>&nbsp;
</div>
      </div>
        </>
    )
};
export default Profile;