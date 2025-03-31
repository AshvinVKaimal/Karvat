import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Items = () => {
  const [profileData, setProfileData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios({
      method: "GET",
      url: "/Store",
    })
      .then((response) => {
        console.log(1);
        const res = response.data;
        const profileDataArray = res.map((item) => ({
          store_id: item[0],
          id: item[1],
          price: item[3],
          name: item[4],
          image: item.image, // Assuming item has an image property
        }));

        setProfileData(profileDataArray);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  function handleEditClick(itemId) {
    navigate("/vendor/items/edit", { state: { itemId: itemId } }); // Use navigate to navigate without changing the URL
  }
  function handleAddClick(itemId) {
    navigate("/vendor/items/add", { state: { itemId: itemId } }); // Use navigate to navigate without changing the URL
  }

  return (
    <React.StrictMode>
      <div className="bg-krvt_cream h-full min-h-screen">
        <div className="max-w-lg mx-auto">
          <h1 className="flex"></h1>
          <h1 className="flex text-krvt_brick font-karvat text-6xl mt-5 justify-center text-center">
            Vendor Center
          </h1>
        </div>

        <div className="flex">
          <div className="w-1/3 md:w-1/4 h-56 md:h-64 mt-5 mx-4 group flex relative bg-krvt_brick p-5 rounded-2xl">
            <div className="font-body text-white text-left z-10 px-2">
              <a
                href="/vendor/dashboard"
                className="text-lg md:text-xl leading-tight"
              >
                Dashboard
              </a>
              <h6 className="text-sm">
                <span>&#8203;</span>
              </h6>
              <a
                href="/vendor/orders"
                className="text-lg md:text-xl leading-tight"
              >
                Orders List
              </a>
              <h6 className="text-sm">
                <span>&#8203;</span>
              </h6>
              <a
                href="/vendor/items"
                className="text-lg md:text-xl leading-tight"
              >
                Manage Items
              </a>
              <h6 className="text-sm">
                <span>&#8203;</span>
              </h6>
              <a href="/login" className="text-lg md:text-xl leading-tight">
                Log Out
              </a>
            </div>
          </div>
          <div className="w-2/3 md:w-3/4 mt-5 px-2 rounded-2xl">
            <div className="font-body text-krvt_brick text-left z-10 px-2">
              <h2 className="font-karvat text-4xl sm:text-3xl px-1">
                Manage Items
              </h2>

              {/* Items */}
              <div className="grid gap-5 p-3">
                {profileData &&
                  profileData.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between relative bg-white p-5 h-48 md:h-32 rounded-2xl"
                    >
                      <a href="#">
                        <img
                          className="relative bottom-3 h-28"
                          src={item.image}
                          alt="Item"
                        />
                      </a>
                      <div className="text-gray-600">
                        <a href="#" className="font-karvat text-xl ml-5">
                          {item.name}
                        </a>
                        <p className="font-body text-md ml-5">
                          {item.description}
                        </p>
                        <div className="flex ml-6 mt-1">
                          <button
                            className="bg-gray-600 relative top-1 px-3 py-0.5 rounded-xl font-body text-md text-white text-center hover:bg-gray-400"
                            onClick={() => handleEditClick(item.id)}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                      <div></div> {/* Spacer */}
                      <div></div> {/* Spacer */}
                      <div></div> {/* Spacer */}
                      <div></div> {/* Spacer */}
                      <div></div> {/* Spacer */}
                      <div></div> {/* Spacer */}
                      <div></div> {/* Spacer */}
                      <div></div> {/* Spacer */}
                      <div></div> {/* Spacer */}
                      <div></div> {/* Spacer */}
                      <h1 className="font-karvat text-2xl text-gray-800 relative bottom-0.5 right-2">
                        ₹{item.price}
                      </h1>
                    </div>
                  ))}
              </div>

              <div className="flex justify-center mt-3">
                <button
                  className="bg-krvt_mahogany px-4 py-2 rounded-xl font-karvat text-2xl text-white text-center hover:bg-krvt_brick"
                  onClick={() => handleAddClick(1)}
                >
                  Add Items
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

export default Items;
