import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import img from "../images/items/test_item.png";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const Bag = () => {
  const [profileData, setProfileData] = useState(null);
  const [subtotal, setSubtotal] = useState(null);
  const [shipCost, setShipCost] = useState(null);
  const [order_details, setOrderDetails] = useState(null);

  useEffect(() => {
    getAmount();
    makeOrder();
    getShippingCost();
    getData();
  }, []);

  function getAmount() {
    axios({
      method: "GET",
      url: "/getTotalAmount",
    })
      .then((response) => {
        setSubtotal(response.data.totalAmount);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function handleChange(event, item) {
    const selectedValue = event.target.value;

    axios
      .post("/ChangeQuantity", { item, selectedValue })
      .then((response) => {
        // Handle response from the server
        window.location.reload(); // Reload the page
      })
      .catch((error) => {
        // Handle errors
      });
  }

  function getShippingCost() {
    axios({
      method: "GET",
      url: "/getShippingCost",
    })
      .then((response) => {
        setShipCost(response.data.shippingCost);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function getData() {
    axios({
      method: "GET",
      url: "/Cart",
    })
      .then((response) => {
        const res = response.data;
        const profileDataArray = res.map((item) => ({
          store_Id: item[0],
          Item_Id: item[1],
          Customer_Id: item[2],
          Quantity: item[3],
          Price: item[4],
          ItemName: item[5],
        }));

        setProfileData(profileDataArray);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function makeOrder() {
    axios({
      method: "GET",
      url: "/createOrder",
    })
      .then((response) => {
        setOrderDetails(response.data);
        async function displayRazorpay() {
          const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
          );

          if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
          }
          var options = {
            key: "rzp_test_BXNSan3NdLPrPa",
            amount: ({ subtotal } * 100).toString(),
            currency: "INR",
            name: "Karvat",
            description: "Test Transaction",
            image: "",
            order_id: response.data.id,
            callback_url: "/authenticate",
            theme: {
              color: "#3399cc",
            },
          };
          var rzp1 = new window.Razorpay(options);
          document.getElementById("rzr-pay-checkout").onclick = function (e) {
            rzp1.open();
            e.preventDefault();
          };
        }
        displayRazorpay();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  return (
    <React.StrictMode>
      <div className="bg-krvt_cream h-full min-h-screen">
        {/* Main text */}
        <div className="max-w-lg mx-auto">
          <h1 className="flex"></h1>
          <h1 className="flex text-krvt_brick font-karvat text-6xl mt-5 justify-center text-center">
            Shopping Bag
          </h1>
          <p className="flex text-krvt_moss font-body text-xl mb-5 justify-center text-center">
            Look through the items you've selected from your travels
            <br></br>and get ready to check out with the ones you want
          </p>
        </div>

        <div className="flex justify-start ml-8 mx-auto">
          {/* Items */}
          <div className="grid gap-5 p-3 w-2/3">
            {profileData &&
              profileData.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-start relative bg-white p-5 h-32 rounded-2xl"
                >
                  <a href="#">
                    <img
                      className="relative bottom-3 h-28"
                      src={img}
                      alt="Item"
                    />
                  </a>
                  <div className="text-gray-600">
                    <a href="#" className="font-karvat text-xl ml-5">
                      {item.ItemName}
                    </a>
                    <p className="font-body text-md ml-5">
                      {/* Add item description here */}
                      Details of item
                    </p>
                    <div className="flex ml-5">
                      <select
                        className="bg-white border-2 border-gray-300 px-2 py-1 rounded-md mt-2"
                        onChange={(event) => handleChange(event, item)}
                      >
                        {[...Array(10)].map((_, i) => (
                          <option
                            key={i}
                            value={i + 1}
                            selected={i + 1 === item.Quantity}
                          >
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <h1 className="font-karvat text-2xl text-gray-800 relative bottom-0.5 ml-auto">
                    ₹{item.Price}
                  </h1>
                </div>
              ))}
          </div>

          <div className="w-1/4 m-3 lg:ml-10 xl:ml-14 2xl:ml-20">
            <div className="bg-krvt_brick text-white p-3 md:p-5 rounded-2xl">
              <h1 className="font-karvat text-2xl md:text-3xl lg:text-4xl">
                Order Summary
              </h1>
              <div className="flex justify-between mt-3">
                <p className="font-body text-lg md:text-xl lg:text-2xl">
                  Subtotal:
                </p>
                <p className="font-body text-lg md:text-xl lg:text-2xl">
                  ₹{subtotal}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-body text-lg md:text-xl lg:text-2xl">
                  Shipping:
                </p>
                <p className="font-body text-lg md:text-xl lg:text-2xl">
                  ₹{shipCost}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-body text-lg md:text-xl lg:text-2xl">
                  Total:
                </p>
                <p className="font-body text-lg md:text-xl lg:text-2xl">
                  ₹{subtotal + shipCost}
                </p>
              </div>
              <div className="flex justify-center mt-6 mb-2 ml-1">
                <button
                  id="rzr-pay-checkout"
                  className="bg-krvt_mahogany px-3 py-1 rounded-2xl font-karvat text-xl lg:text-2xl text-center hover:bg-krvt_ochre"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
        <br></br>
      </div>
    </React.StrictMode>
  );
};

export default Bag;
