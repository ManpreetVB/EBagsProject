import React,{useState,useEffect} from "react";
import AdminHeader from "./AdminHeader";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const AdminOrders = () => {
    const [data, setData] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [orderNumber, setOrderNumber] = useState("")
  const [orderStatus, setOrderStatus] = useState("");
  const [show, setShow] = useState(false);
  const [showOrderStatus, setShowOrderStatus] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleCloseOrderStatus = () => setShowOrderStatus(false);

  useEffect(() => {
    getData("Admin", 0);
  }, []);

  const getData = (type, id) => {
    const data = {
      ID : id,
      type: type,
      Email: localStorage.getItem("username"),
    };
    const url = `https://localhost:7229/api/Bag/OrderList`;
    axios
      .post(url, data)
      .then((result) => {
        const data = result.data;
        if (data.statusCode === 200) {
          type === "Admin" ? setData(data.listOrders) : setItemData(data.listOrders);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleItemDetail = (id) => {
    getData("UserItems",id);
    setShow(true);
  };

  const handleOrderStatusDetail = (orderNumber) => {
    setOrderNumber(orderNumber);
    setShowOrderStatus(true);
  };

  const handleOrderStatus =(e) =>{
    e.preventDefault();
    const url = `https://localhost:7229/api/Admin/UpdateOrderStatus`;
    const data = {  
      OrderNumber: orderNumber,
      OrderStatus: orderStatus
    };

    axios
      .post(url, data)
      .then((result) => {
        setShowOrderStatus(false);
        getData("Admin", 0);
        setOrderStatus("");        
        const dt = result.data;
        alert(dt.statusMessage);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  

    return(
        <>
        <AdminHeader/>
        <div class="form-group col-md-12">
        <h3>All Orders</h3>
      </div>
      {data ? (
        <table
          className="table stripped table-hover mt-4"
          style={{ backgroundColor: "white", width: "80%", margin: "0 auto" }}
        >
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Order Number</th>
              <th scope="col">Order Total</th>
              <th scope="col">Status</th>
              <th scope="col">Update Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((val, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{val.customerName}</td>
                  <td onClick={() => handleItemDetail(val.id)}>
                    {val.orderNumber}
                  </td>
                  <td>{val.orderTotal}</td>
                  <td>{val.orderStatus}</td>
                  
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() => handleOrderStatusDetail(val.orderNumber)}>
                      Update
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        "No data found"
      )}
      <div style={{ width: "100%" }}>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Order Details for : ({itemData && itemData.length > 0 ? itemData[0]["orderNumber"] : ""})</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {itemData ? (
              <table className="table stripped table-hover mt-4">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">#</th>                   
                    <th scope="col">BagBrand</th>
                    <th scope="col">Material</th>
                    <th scope="col">BagColor</th>
                    <th scope="col">BagType</th>
                    <th scope="col"> Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total Price</th>
                   
                    {/* <th scope="col">Image</th>                     */}
                  </tr>
                </thead>
                <tbody>
                  {itemData.map((val, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{val.bagBrand}</td>
                        <td>{val.material}</td>
                        <td>{val.bagColor}</td>
                        <td>{val.bagType}</td>
                        <td>{val.price}</td>
                        <td>{val.quantity}</td>
                        <td>{val.totalPrice}</td>
                        
                        {/* <td>
                          <img src={val.imageUrl} style={{ height:"10%" }} />
                        </td> */}
                        
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              "No data found"
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div style={{ width: "100%" }}>
        <Modal show={showOrderStatus} onHide={handleCloseOrderStatus}>
          <Modal.Header>
            <Modal.Title>Update Order Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="row">
              <div className="col-md-6">
                <label>
                  Select Status
                </label>
                <select
                  id="orderStatus"
                  className="form-control"                  
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value)}>
                  <option value="Cancel">Cancel</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="Primary" onClick={(e)=>handleOrderStatus(e)}>
              Update Status
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
        </>
    );
};
export default AdminOrders;