import React,{useState,useEffect} from "react";
import axios from "axios";
import { baseUrl } from "../constant";
import Header from "./Header";

const BagDisplay = () => {
    const [data, setData] = useState([]);
    const [ quantity, setOrderQuantity] = useState(1);
    useEffect(() => {
        getData();
      }, []);
    
      const getData = () => {
        const data = {
          Email: "Admin",
        };
        const apiUrl = `https://localhost:7229/api/Admin/CartList`;
    axios.post(apiUrl, data)
      .then((result) => {
        const data = result.data;
        if (data.statusCode === 200) {
          setData(data.listCart);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }; 
  
  const handleAddToCart = (e, id) => {
    e.preventDefault();
    const data = {
      ID: id,
      Quantity : quantity,
      Email: localStorage.getItem("username"),
    };
    const url = `https://localhost:7229/api/Bag/AddToCart`;
    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
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
        <Header/>
        <div className="container">
          {data && data.length > 0
            ? data.map((val, index) => {
                return (
                  <div
                    key={index}
                    class="col-md-3"
                    style={{ marginBottom: "21px" }}
                  >
                    <div class="card">
                      <img
                        class="card-img-top"
                        src={`images/${val.imageUrl}`}
                        alt="Card image"
                      />
                      <div class="card-body">
                        <h4 class="card-title"> {val.bagBrand}</h4>
                        <h4 class="card-title">
                          <select
                            id="bagQuantity"
                            className="form-control"
                            onChange={(e) => setOrderQuantity(e.target.value)}>
                              <option value="-1">Select Quantity</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </h4>
                        <button class="btn btn-primary" onClick={(e)=> handleAddToCart(e,val.id)}>Add to cart</button>
                      </div>
                    </div>
                  </div>
                );
              })
            : "Loading products..."}
        </div>
    
        </>
    );
};
export default BagDisplay;