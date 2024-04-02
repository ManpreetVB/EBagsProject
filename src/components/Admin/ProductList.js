import React,{useState,useEffect }from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import { baseUrl } from "../constant";

const ProductList= ()=>
{
    const [data, setData]=useState([]);


useEffect(()=>{
axios.get(`https://localhost:7229/api/Admin/ProductListCarts`)
.then((result)=>{
    
    setData(result.data.response.listProducts);
})
.catch((error) => {
    console.log(error);
}) 
},[]); 

 const handleAddProduct=(id)=>{
    const data ={
       ID:id,

    };
    axios.post(`https://localhost:7229/api/Admin/AddProduct`,data)
    .then((result)=>{
        if(result.data.response.statusCode===200)
        {
            alert('item added')

        }
        else{
            alert('no item added')
        }
    })
    .catch((error) => {
        console.log(error);
    }) ;
}
const handleRemoveProduct=(id)=>{
    const data ={
       ID:id,

    };
    axios.post(`https://localhost:7229/api/Admin/RemoveProduct`,data)
    .then((result)=>{
        if(result.data.response.statusCode===200)
        {
            alert('item has been removed ')

        }
        else{
            alert('something went wrong')
        }
    })
    .catch((error) => {
        console.log(error);
    }) ;
}

    return(
        <>
        <AdminHeader/>
        
        <div className="banner">
            <div className ="banner-layer">
                <h1 className="title-w3layouts">
                    <span className="fa fa-cart-arrow-down" aria-hidden="true">    </span>
                    Product Display
                    
                </h1>
            </div>
            <div className="wthreeproductdisplay">
                <div className="container">
                   <div className="row">
                    {
                        data && data.length>0
                        ?data.map((item,index)=>{
                            return(
                                <div
                    key={index}> 
                                <div className="cart-grid" id="cart-1">
                                <div className ="img">
                                <img src={`images/${item.image}`}alt="img"style={{ width: "200px",height:"200px" }} ></img>

                                </div>
                                <ul className="info">
                                    <li>${item.discountedPrice}</li>
                                    <li ><del>${item.actualPrice}</del></li>
                                </ul>
                                <div className="snipcart-details">
                                 <form action="products">
                                  <input type ="hidden"name="cmd" value="_cart"/>
                                  <input type ="hidden"name="add" value="1"/>
                                  <input type ="hidden"name="w31_item" value="Striped Top"/>
                                  <input type ="hidden"name="amount" value="25.00"/>
                                  <input type ="hidden"name="item_name" value="product #001"/>
                                         <button type="submit" className="button w31-cart" data-id="cart-3" 
                                          onClick={() =>handleAddProduct(item.id)}>Add To Cart</button>&nbsp;
                                          <button onClick={()=>handleRemoveProduct(item.id)}>Remove Item</button><br></br>
                                  </form>
                                 </div>
                            </div> 
                            </div> 
                            )
                        })
                       
                                    
                                  :
                                  "no data"
                    }             
              
            <br></br>
            
         </div>
         </div>
         </div>
         <div className="wthreecartaits wthreecartaits2 cart cartbbox_1">
            <form action="ProductList"method="post"class="last">
            <input type ="hidden"name="cmd" value="_cart"/>
            <input type ="hidden"name="display" value="1"/>
            <button className="w3view-cart"type="submit" name="submit"value="">
                View cart
                <span className="fa fa-cart-arrow-down" aria-hidden="true"></span>
            </button>
            </form>
         </div>
        </div>
        </>
  
    )             
    }
    export default ProductList;