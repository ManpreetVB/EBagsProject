
import React,{useState,useEffect }from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import { baseUrl } from "../constant";

const Products= ()=>
{
    const [data, setData]=useState([]);


useEffect(()=>{
axios.get(`https://localhost:7229/api/Admin/ProductList`)
.then((result)=>{
    setData(result.data.response.listProducts);
})
.catch((error) => {
    console.log(error);
}) 
},[]); 

const handleAddProduct=(id)=>{
    const data={
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



    return(
        <>
        <AdminHeader/>
        
        <div class="banner">
            <div class ="banner-layer">
                <h1 className="title-w3layouts">
                    <span className="fa fa-cart-arrow-down" aria-hidden="true">   
                    Product Display
                    </span>
                </h1>
            </div>
            <div class="wthreeproductdisplay">
                <div class="container">
                   <div className="row" >
                    
                  
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
                                <div className="info">
                                <li>${item.discountedPrice}</li>
                                 <li>  <del> ${item.actualPrice}</del></li>
                                   
                                </div>
                                <div className="snipcart-details">
                                 <form action="products">
                                  <input type ="hidden"name="cmd" value="_cart"/>
                                  <input type ="hidden"name="add" value="1"/>
                                  <input type ="hidden"name="w31_item" value="Striped Top"/>
                                  <input type ="hidden"name="amount" value="25.00"/>
                                  <input type ="hidden"name="item_name" value="product #001"/>
                                        <button type="submit" className="button w31-cart" data-id="cart-3"
                                         onClick={() =>handleAddProduct(item.id)}>Add To Cart</button>
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
         <div class="wthreecartaits wthreecartaits2 cart cartbbox_1">
            <button class="w3view-cart"type="submit" name="submit"value="">
                View cart
                <span class="fa fa-cart-arrow-down" aria-hidden="true"></span>
            </button>
         </div>
        </div>
        </>
  
    )             
    }
    export default Products;