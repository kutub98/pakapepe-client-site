import React from "react";

import { Outlet } from "react-router-dom";
import Footer from "../Home/Footer/Footer";
import TopHeader from "../TopHeader/TopHeader";
const MainHome = () => {
  return (
    <div>
        <TopHeader></TopHeader>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainHome;
