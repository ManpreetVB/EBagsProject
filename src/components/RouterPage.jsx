import React from "react";
import {BrowserRouter as Router,Routes,Route}from 'react-router-dom'
import Login from "./Login form/Login";
import Registration from "./User/Registration";
import Dashboard from "./User/Dashboard"; 
import Orders from "./User/Orders";
import Profile from "./User/Profile";
import Cart from "./User/Cart";
import BagDisplay from "./User/BagDisplay";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminOrders from "./Admin/AdminOrders";

import Bags from "./Admin/Bags";
import UserList from "./Admin/UserList";
const RouterPage =() => {
    return(
       <Router>
        <Routes>
           
           <Route path="/" element={<Login/>} />
           <Route path="/registration" element={<Registration/>} />
           <Route path="/dashboard" element={<Dashboard/>} />
           <Route path="/profile/" element={<Profile/>} />
           <Route path="/orders" element={<Orders/>} />
          
           <Route path="/cart" element={<Cart/>} />
           <Route path="/bagdisplay" element={<BagDisplay/>} />
    
           <Route path="/admindashboard" element={<AdminDashboard/>} />
           <Route path="/adminorders" element={<AdminOrders/>}  />
           <Route path="/userlist" element={<UserList/>}/>
           <Route path="/bags" element={<Bags/>} />
           
        </Routes>
       </Router>
    );
};
export default RouterPage;
