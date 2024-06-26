import React,{useState,useEffect} from "react";
import axios from "axios";
import Header from "./Header";

const Cart = () => {
    const [data, setData] = useState([]);
     

    useEffect(() => {
        getData();
      }, []);
    
      const getData = () => {
        const data = {
          Email: localStorage.getItem("username"),
        };

        const url = `https://localhost:7229/api/Admin/CartList`;
    axios
      .post(url, data)
      .then((result) => {
        const data = result.data.response;
        if (data.statusCode === 200) {
          setData(data.listCart);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePlaceOrder =(e)=>{
    e.preventDefault();
    const data = {
      Email: localStorage.getItem("username")
    };
    const url = `https://localhost:7229/api/Bag/PlaceOrder`;
    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data.response;
        if (dt.statusCode === 200) {
          setData([]);
          alert(dt.statusMessage);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleRemoveToCart = (e, id) => {
    e.preventDefault();
    const data = {
      ID: id,
      Email: localStorage.getItem("username"),
    };
    const url = `https://localhost:7229/api/Bag/RemoveToCart`;
    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data.response;
        if (dt.statusCode === 200) {
          getData();
          alert(dt.statusMessage);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

    return(
        <>
         <Header />
      <br></br>
      <div class="form-group col-md-12">
        <h3>Cart items</h3>
        {data && data.length ?
        <button className="btn btn-primary" onClick={(e)=> handlePlaceOrder(e)}>
          Place Order
        </button>
        : ''}
      </div>
      <div
        style={{
          backgroundColor: "white",
          width: "80%",
          margin: "0 auto",
          borderRadius: "11px",
        }}
      >
        <div className="card-deck">
          {data && data.length > 0
            ? data.map((val, index) => {
              return(
                <div key={index} class="col-md-3" style={{marginBottom:"21px"}}>
                <div class="card">
                  <img
                    class="card-img-top"
                    src={`images/${val.imageUrl}`}
                    alt="Card image"
                  />
                  <div class="card-body">
                    <h4 class="card-title">BagBrand : {val.bagBrand}</h4>               
                    <h4 class="card-title">Quantity : {val.quantity}</h4> 
                    <button class="btn btn-primary" onClick={(e)=> handleRemoveToCart(e,val.id)}>Remove</button>         
                  </div>
                </div>
              </div>
              )
            })
            : "No item to display. Kindly add..."}
        </div>
      </div>
        </>
    );
};
export default Cart;