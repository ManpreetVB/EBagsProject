import axios from "axios";
import React,{useEffect , useState} from "react";
import AdminHeader from "./AdminHeader";
import Button from "react-bootstrap/Button";
const UserList = () => {
    const [userData , setUserData] = useState([])
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [email, setEmail] = useState("");
    
  
  useEffect(() => {
        axios.get("https://localhost:7229/api/Admin/UserList")
        .then((result) => setUserData(result.data.response.listUsers))
        .then((error) => console.log(error))
    }) ;
    
    
    const handleItemDetail = (email) => {
        setEmail(email);
        setShow(true);
      };


    return(
       <>
       <AdminHeader/>
       
        <table class="table table-hover">
        <thead>
            <tr>
                <th>UserID</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
                <th>Password</th>
                <th>Address</th>
                <th>Type</th>
            </tr>
        </thead>
        <tbody>
       {
        userData !== undefined && userData !== null && userData.length>0
        ?
        userData.map((user,index) =>{
            return(
                <tr key={index}>
                    <td>{user.userID}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.address}</td>
                    <td>{user.type}</td>
                    <td>
                    <Button
                      variant="primary"
                      onClick={() => handleItemDetail(user.email)}
                    >{""}
                      Update{""}
                    </Button>
                  </td>
                </tr>
            )
        })
        :
        'No Data available'
       }
       </tbody>
       </table>
       </>
    );
};
export default UserList;