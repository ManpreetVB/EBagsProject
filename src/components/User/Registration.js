import { useState } from "react";
import { Link } from "react-router-dom";

import React from "react";
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox}from 'mdb-react-ui-kit';


import Header from "./Header";
const Registration =()=>{
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [address,setAddress]=useState("");
    const [type,setType]=useState("");
    

    const handleRegistration = (e) =>{
        const apiUrl='https://localhost:7229/api/Users/Registration';
        const requestBody={
            "firstName":firstName,
            "lastName":lastName,
            "email":email,
            "password":password,
            "address":address,
            "type":type

        };
        axios.post(apiUrl,requestBody)
        .then((result) => {
          if(result.data.response.statusCode === 200)
          {
            
           alert(result.data.response.statusMessage);
          }
          else{
            alert(result.data.response.statusMessage);
          }
        })
        .catch((error) => {
          console.log(error)
        })
      };

   
    return(
        <>
        <Header/>

         <MDBContainer fluid>

      <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <h1>Registration</h1><br></br>

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
        <label className="label">Address</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Address "
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
      </div>
      
        <div className="row">
        <label className="label">Type</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Type "
          onChange={(e) => setType(e.target.value)}
          value={type}
        />
      </div>
      

        <div className="row">
        <button className="btn btn-primary "onClick={(e) => handleRegistration(e)}>
          {" "}
         Register Me{" "}
        </button>
        &nbsp;
        <Link to = "/" button className="btn btn-danger">Login</Link>
      </div>
    </div>
    </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
        </>
       
    );
};
export default Registration;