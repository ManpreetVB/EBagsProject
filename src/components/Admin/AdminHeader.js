import React from "react";
import{Link} from "react-router-dom";

import { useNavigate } from "react-router-dom";
const AdminHeader = () => {
  const navigate = useNavigate();
  const handelLogout = (e) => {
    localStorage.removeItem("loggedInUser");
    window.location.href="/"
    navigate("/");
  };
    return(
        <>
        <nav class="navbar navbar-expand-lg navbar-light bg-dark">
       <a class="navbar-brand" href="#">
        Admin Panel
       </a>
       <button
         class="navbar-toggler"
         type="button"
         data-toggle="collapse"
         data-target="#navbarNavDropdown"
         aria-controls="navbarNavDropdown"
         aria-expanded="false"
         aria-label="Toggle navigation"
       >
         <span class="navbar-toggler-icon"></span>
       </button>
       <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
       <a className="navbar-brand" href="#"style={{color:"white"}}>
         EBag
       </a>
       </div>
       {localStorage.getItem("loggedInUser") === "true" ? (
       <div class="collapse navbar-collapse" id="navbarNavDropdown">
         <ul class="navbar-nav" style={{color:"white"}}>
           <li class="nav-item active">
             <Link to="/admindashboard" class="nav-link" href="#" style={{color:"white"}}>
               AdminDashboard <span class="sr-only">(current)</span>
             </Link>
           </li>
           
           <li class="nav-item">
            <Link to="/userlist" class="nav-link" href="#" style={{color:"white"}}>
            Manage Users
             </Link>
           </li>
           
          
           <li class="nav-item">
           <Link to="/adminorders" class="nav-link" href="#" style={{color:"white"}}>
              Manage Orders 
             </Link>
           </li>

           <li class="nav-item">
           <Link to="/bags" class="nav-link" href="#" style={{color:"white"}}>
               Manage Bag
             </Link>
           </li>
          
           <li class="nav-item">
                <Link
                  class="nav-link"
                  href="#"
                  style={{ color: "white" }}
                  onClick={(e) => handelLogout(e)}
                >
                  Logout
                </Link>
              </li>
         </ul>
       </div>
       ) : (
          ""
        )}
     </nav>     
   </>

    );
};
export default AdminHeader;