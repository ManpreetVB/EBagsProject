import React,{useState,useEffect} from "react";
import Header from "./Header";
import  Modal  from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
const Orders = () => {

    const [data, setData] = useState([]);
  const [itemData, setItemData] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  useEffect(() => {
    getData("User", 0);
  }, []);

  const getData = (type, id) => {
    const data = {
      ID : id,
      type: type,
      Email: localStorage.getItem("username"),
    };

    const apiUrl = `https://localhost:7229/api/Bag/OrderList`;
    axios
      .post(apiUrl, data)
      .then((result) => {
        const data = result.data;
        if (data.statusCode === 200) {
          type === "User" ? setData(data.listOrders) : setItemData(data.listOrders);
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
    return(
        <>
        <Header/>
        <div class="form-group col-md-12">
        <h3>My Orders</h3>
      </div>
      {data ? (
        <table
          className="table stripped table-hover mt-4"
          style={{ backgroundColor: "white", width: "80%", margin: "0 auto" }}
        >
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">OrderNumber</th>
              <th scope="col">OrderTotal</th>
              <th scope="col">OrderStatus</th>
              
            </tr>
          </thead>
          <tbody>
            {data.map((val, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td onClick={() => handleItemDetail(val.id)}>
                    {val.orderNumber}
                  </td>
                  <td>{val.orderTotal}</td>
                  <td>{val.orderStatus}</td>
                  
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
            <Modal.Title>Order Details for : ({itemData && itemData.length > 0 ? itemData[0]["orderNo"] : ""})</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {itemData ? (
              <table className="table stripped table-hover mt-4">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">#</th>                   
                    <th scope="col">BagBrand</th>
                    <th scope="col">Material</th>
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

        </>
    );
};
export default Orders;