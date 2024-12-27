import React from "react";
import Navbar from "../Routing/Navbar";
import Login from "./Login";
import Header from "../Components/Header";
import img from "../assets/house.png";

export default function Home() {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <div>
        <img src={img} alt="Example" />
      </div>
      
    </div>
  );
}
