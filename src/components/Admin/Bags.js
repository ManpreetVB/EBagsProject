import React,{useState,useEffect} from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";

const Bags = () => {

    const [data, setData] = useState([]);
    const [id, setID] = useState("");
    const [bagBrand, setBagBrand] = useState("");
    const [material, setMaterial] = useState("");
    const [bagColor, setBagColor] = useState("");
    const [bagType, setBagType] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [quantity, setQuantity] = useState("");
    const [file, setFile] = useState("");
    const [fileName, setFileName] = useState("");
    const [addUpdateFlag, setAddUpdateFlag] = useState(true);
  
    useEffect(() => {
      getData();
    }, []);
    const getData = () => {
        const data = {
          type: "Get",
          Email: localStorage.getItem("loggedEmail"),
        };
        const url = `https://localhost:7229/api/Admin/AddUpdateBag`;
        axios
          .post(url, data)
          .then((result) => {
            const data = result.data;
            if (data.statusCode === 200) {
              setData(data.listBag);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
      const deleteBag = (e, id) => {
        debugger;
        e.preventDefault();
        const data = {
          Id: id,
          Type: "Delete",
        };
        const url = `https://localhost:7229/api/Admin/AddUpdateBag`;
        axios
          .post(url, data)
          .then((result) => {
            const data = result.data;
            if (data.statusCode === 200) {
              getData();
              alert(data.statusMessage);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      const editBag = (e, id) => {
        e.preventDefault();
        setAddUpdateFlag(false);
        const data = {
          ID: id,
          Type: "GetByID",
        };
        const url = `https://localhost:7229/api/Admin/AddUpdateBag`;
        axios
          .post(url, data)
          .then((result) => {
            const data = result.data;
            if (data.statusCode === 200) {
              setID(id);
              setBagBrand(data.listBag[0]["bagBrand"]);
              setMaterial(data.listBag[0]["material"]);
              setBagColor(data.listBag[0]["bagColor"]);
              setBagType(data.listBag[0]["bagType"]);
              setPrice(data.listBag[0]["price"]);
              setDiscount(data.listBag[0]["discount"]);
              setQuantity(data.listBag[0]["quantity"]);
              
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      const SaveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
      };
    
      const uploadFile = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("FormFile", file);
        formdata.append("FileName", fileName);
    
        try {
          const res = await axios.post(`https://localhost:7229/api/Uploader/UploadFile`, formdata);
          console.log(res);
          if (
            res.data.statusCode === 200 &&
            res.data.statusMessage === "File uploaded"
          ) {
            const data = {
              BagBrand:bagBrand,
              Material:material,
              Price:price,
              Discount: discount,
              Quantity: quantity,
              
             IsActive: 1,
              ImageUrl: fileName,
              ActionType: "Add",
            };
            const url = `https://localhost:7229/api/Admin/AddUpdateBag`;
            axios
              .post(url, data)
              .then((result) => {
                const data = result.data;
                if (data.statusCode === 200) {
                  getData();
                  Clear();
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        } catch (ex) {
          console.log(ex);
        }
      };
    
      const Clear = () => {
        setBagBrand("");
        setMaterial("");
        setBagColor("");
        setBagType("");
        setPrice("");
        setDiscount("");
        
        setFile("");
        setFileName("");
        setQuantity("");
      };
    
      const updateBag = (e) => {
        const data = {
          ID : id,
          BagBrand: bagBrand,
          Material: material,
          Price: price,
          Discount: discount,
          Quantity: quantity,
         
          IsActive: 1,
          ImageUrl: "",
          ActionType: "Update",
        };
        const url = `https://localhost:7229/api/Admin/AddUpdateBag`;
        axios
          .post(url, data)
          .then((result) => {
            const dt = result.data;
            if (dt.statusCode === 200) {
              getData();
              Clear();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
    return(
    <>
    <AdminHeader/>
    <form>
        <div
          class="form-row"
          style={{ width: "80%", backgroundColor: "white", margin: " auto" }}
        >
          <div class="form-group col-md-12">
            <h3>Manage Bag</h3>
          </div>
          <div className="form-group col-md-6">
            <input
              type="text"
              onChange={(e) => setBagBrand(e.target.value)}
              placeholder="BagBrand"
              className="form-control"
              required
              value={bagBrand}
            />
          </div>

          <div className="form-group col-md-6">
            <input
              type="text"
              onChange={(e) => setBagColor(e.target.value)}
              placeholder="BagColor"
              className="form-control"
              required
              value={bagColor}
            />
          </div>

          <div className="form-group col-md-6">
            <input
              type="text"
              onChange={(e) => setBagType(e.target.value)}
              placeholder="BagType"
              className="form-control"
              required
              value={bagType}
            />
          </div>

          <div className="form-group col-md-6">
            <input
              type="text"
              onChange={(e) => setMaterial(e.target.value)}
              placeholder="Material"
              className="form-control"
              required
              value={material}
            />
          </div>

          <div className="form-group col-md-6">
            <input
              type="text"
              className="form-control"
              id="validationTextarea"
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
              required
              value={price}
            ></input>
          </div>
          <div className="form-group col-md-6">
            <input
              type="text"
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Discount"
              className="form-control"
              required
              value={discount}
            />
          </div>
          <div className="form-group col-md-6">
            <input
              type="text"
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="quantity"
              className="form-control"
              required
              value={quantity}
            />
          </div>
         
          <div className="form-group col-md-6">
            <input
              type="file"
              onChange={(e) => SaveFile(e)}
              placeholder="Image url"
              className="form-control"              
            />
          </div>
          <div className="form-group col-md-6">
            
            {addUpdateFlag ? (
              <button
                className="btn btn-primary"
                style={{ width: "150px", float: "left" }}
                onClick={(e) => uploadFile(e)}
              >
                Add
              </button>
            ) : (
              <button
                className="btn btn-primary"
                style={{ width: "150px", float: "left" }}
                onClick={(e) => updateBag(e)}
              >
                Update
              </button>
            )}
            <button
              className="btn btn-danger"
              style={{ width: "150px" }}
              onClick={(e) => Clear(e)}
            >
              Reset
            </button>
          </div>
        </div>
      </form>
      {data ? (
        <table
          className="table stripped table-hover mt-4"
          style={{ backgroundColor: "white", width: "80%", margin: "0 auto" }}
        >
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">BagBrand</th>
              <th scope="col">Material</th>
              <th scope="col">BagColor</th>
              <th scope="col">BagType</th>
              <th scope="col">Price</th>
              <th scope="col">Discount</th>
              <th scope="col">Quantity</th>
              
              <th scope="col">Image</th>
              <th scope="col" colSpan="2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((val, index) => {
              return (
                <tr key={index}>
                  <td scope="row">{index + 1}</td>
                  <td>{val.bagBrand}</td>
                  <td>{val.material}</td>
                  <td>{val.bagColor}</td>
                  <td>{val.bagType}</td>
                  <td>{val.price}</td>
                  <td>{val.discount}</td>
                  <td>{val.quantity}</td>
                  
                  <td>
                    <img
                      src={`assets/images/${val.imageUrl}`}
                      style={{ width: "70px", borderRadius: "11px" }}
                    />
                  </td>
                  <td>
                    <button onClick={(e) => editBag(e, val.id)}>
                      Edit
                    </button>{" "}
                  </td>
                  <td>
                    <button onClick={(e) => deleteBag(e, val.id)}>
                      Delete
                    </button>{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        "No data found"
      )}
    </>
    );
        
};
export default Bags;