import React from "react";
import "../../App.css";
import InventoryTable from "../../components/InventoryTable"; // Import the InventoryTable component
import SalesPlot from "../../components/SalesPlot"; // Import the SalesPlot component
import { Navigate, Route, useNavigate } from 'react-router-dom';
import axios from "axios";

const Dashboard = () => {
  const position = {
    position: "absolute",
    top: "550px", // Adjust top position as needed
    left: "230px", // Adjust left position as needed
  };

  const navigate = useNavigate();

  const logout = async () => {
      try {
        const confirm = await axios.post(
          "/Logout",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        navigate("/login");
      } catch (error) {
          console.error(error);
        }};


  return (
    <React.StrictMode>
      <div className="bg-krvt_cream h-full min-h-screen">
        {/* Main text */}
        <div className="max-w-lg mx-auto">
          <h1 className="flex"></h1>
          <h1 className="flex text-krvt_brick font-karvat text-6xl mt-5 justify-center text-center">
            Vendor Center
          </h1>
        </div>

        <div className="flex">
          <div className="w-1/4 md:w-1/5 h-40 md:h-48 mt-5 mx-2 group flex relative bg-krvt_brick p-3 rounded-xl">
            <div className="font-body text-white text-left z-10 px-1">
              <a
                href="/vendor/dashboard"
                className="text-base md:text-lg leading-tight"
              >
                Dashboard
              </a>
              <h6 className="text-xs">
                <span>&#8203;</span>
              </h6>
              <a
                href="/vendor/orders"
                className="text-base md:text-lg leading-tight"
              >
                Orders List
              </a>
              <h6 className="text-xs">
                <span>&#8203;</span>
              </h6>
              <a
                href="/vendor/items"
                className="text-base md:text-lg leading-tight"
              >
                Manage Items
              </a>
              <h6 className="text-xs">
                <span>&#8203;</span>
              </h6>
              <a href="#" onClick={logout} className="text-base md:text-lg leading-tight">
                Log Out
              </a>
            </div>
          </div>

          <div className="w-2/3 md:w-3/4 mt-5 px-2 rounded-2xl">
            <div className="font-body text-krvt_brick text-left z-10 px-2">
              <h2 className="font-karvat text-4xl sm:text-3xl px-1">
                Dashboard
              </h2>
              {/* Add InventoryTable component */}
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 p-2">
                  <InventoryTable />
                </div>
                <div className="w-full md:w-1/2 p-2">
                  <SalesPlot />
                </div>
              </div>
            </div>
          </div>
        </div>
        <br></br>
      </div>
    </React.StrictMode>
  );
};

export default Dashboard;
