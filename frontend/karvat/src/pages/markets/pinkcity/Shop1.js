import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "../../../App.css";

import img from "../../../images/items/test_item.png";

const Shop1 = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  function SendData(item) {
    console.log(item);
    axios
      .post("/Item", { item })
      .then((response) => {
        // Handle response from the server
      })
      .catch((error) => {
        // Handle errors
      });
  }

  function getData() {
    console.log(1);
    axios({
      method: "GET",
      url: "/Store",
    })
      .then((response) => {
        const res = response.data;
        const profileDataArray = res.map((item) => ({
          store_id: item[0],
          id: item[1],
          price: item[3],
          name: item[4],
        }));

        setProfileData(profileDataArray);
        console.log(profileDataArray);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const [items, setItems] = useState([
    { store_id: 1, id: 1, name: "Item 1", price: 100 },
    { store_id: 1, id: 2, name: "Item 2", price: 200 },
    { store_id: 1, id: 3, name: "Item 3", price: 300 },
    // Add more items here as needed
  ]);

  const addToCart = (item) => {
    // Add your addToCart logic here
    console.log("Item added to cart:", item);
  };

  return (
    <React.StrictMode>
      <div className="bg-krvt_cream h-full min-h-screen">
        {/* Main text */}
        <div className="max-w-lg mx-auto">
          <h1 className="flex"></h1>
          <h1 className="flex text-krvt_brick font-karvat text-6xl my-5 justify-center text-center">
            Shop 1
          </h1>
        </div>

        {/* Items */}
        <div className="max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto mt-10">
          <div className="grid grid-cols-6 gap-8 mt-5">
            {profileData &&
              profileData.map((item, index) => (
                <div
                  className="col-span-6 sm:col-span-3 relative bg-white text-gray-600 p-5 rounded-2xl"
                  key={item.id}
                >
                  <img className="" src={img} alt="Item" />
                  {/* Need to add item-specific images to the item database */}
                  <h2 className="font-karvat text-xl">{item.name}</h2>
                  <p className="font-karvat text-2xl text-gray-800 mb-3">
                    ₹{item.price}
                  </p>
                  <a
                    onClick={() => SendData(item)}
                    className="bg-krvt_brick text-white text-lg font-karvat cursor-pointer px-3 py-0 rounded-xl hover:bg-krvt_mahogany"
                  >
                    Add to Cart
                  </a>
                </div>
              ))}
          </div>
        </div>

        <br></br>
      </div>
    </React.StrictMode>
  );
};

export default Shop1;
