import React, { useState } from "react";
import "../../App.css";
import defaultImage from "../../images/items/test_item.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditItem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const Iditem = location.state.itemId;
  const [selectedImage, setSelectedImage] = useState(defaultImage);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteItem = () => {
    axios
      .delete(`/delete-item/${Iditem}`)
      .then((response) => {
        console.log(response.data.message);
        navigate("/vendor/items");
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const handleSaveChanges = () => {
    // Check if all fields are filled
    if (itemName && quantity && price) {
      // Send data to Flask API
      axios
        .post("/savechanges", {
          itemId: Iditem,
          itemName: itemName,
          quantity: quantity,
          price: price,
        })
        .then((response) => {
          // Handle success response
          console.log(response.data.message);
          // Redirect to items page after saving changes
          navigate("/vendor/items");
        })
        .catch((error) => {
          // Handle error
          console.error("Error saving changes:", error);
        });
    } else {
      // If any field is empty, show an alert
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="bg-krvt_cream h-full min-h-screen">
      <div className="flex">
        <div className="w-full mt-6 px-2 rounded-2xl">
          <div className="font-body text-krvt_brick text-left z-10 px-2">
            <h2 className="flex font-karvat justify-center text-4xl px-1">
              Edit Item
            </h2>

            <div className="grid gap-5 p-3">
              <div className="flex justify-center">
                <div className="flex justify-between relative bg-white p-5 w-full lg:w-3/4 rounded-2xl">
                  <div className="text-center">
                    <img
                      className="relative bottom-3 h-40 w-40"
                      src={selectedImage}
                      alt="Item"
                    />
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        id="fileInput"
                        onChange={handleImageChange}
                      />
                      <label
                        htmlFor="fileInput"
                        className="bg-gray-600 px-3 py-1 rounded-xl font-body text-md text-white text-center hover:bg-gray-400 cursor-pointer"
                      >
                        Change Image
                      </label>
                    </div>
                  </div>
                  <div className="text-gray-600 relative right-6 md:right-12 lg:right-24 xl:right-48">
                    <input
                      className="border-2 text-xl border-gray-400 rounded-md p-2"
                      placeholder="Item Name"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                    />
                    <br />
                    <input
                      className="border-2 text-xl border-gray-400 rounded-md p-2"
                      placeholder="Quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div>
                    <h1 className="font-karvat text-2xl text-gray-800 relative bottom-0.5 right-2">
                      ₹
                      <input
                        className="border-2 text-xl font-body w-32 border-gray-400 rounded-md p-2"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </h1>
                    <div className="flex justify-center mt-3">
                      <button
                        className="bg-krvt_brick px-3 py-1 rounded-xl font-karvat text-md text-white text-center hover:bg-krvt_mahogany"
                        onClick={handleDeleteItem}
                      >
                        Delete Item
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-3">
              <button
                className="bg-krvt_mahogany px-4 py-2 rounded-xl font-karvat text-2xl text-white text-center hover:bg-krvt_brick"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};

export default EditItem;
