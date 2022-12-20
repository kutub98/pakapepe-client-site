import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo/logo.png";
import { FaBars, FaWindowClose, RiBarChartHorizontalLine } from "react-icons/fa";
import "./TopHeader.css";
import { authContest } from "../Context/UseContext";
const TopHeader = () => {
  const [openMenu, setOpenMenu] = useState(true);
  const {user, LogOut, logout} = useContext(authContest)
  console.log(user)
  // console.log(user)
    const LogOUT =()=>{
      logout()
      .then(()=>{})
      .catch(error=>console.log(error))
    }
  const menuItem = (
    <React.Fragment>
      <li className="" onClick={() => setOpenMenu(!openMenu)}>
        <Link className=" text-lg " to="/Home">
          Home
        </Link>
      </li>
      <li className="" onClick={() => setOpenMenu(!openMenu)}>
        <Link className=" text-lg " to="/fruits">
          Fruits
        </Link>
      </li>
      <li className="" onClick={() => setOpenMenu(!openMenu)}>
        <Link to="/vegetables" className="">
          Vegetables
        </Link>
      </li>
      <li className="" onClick={() => setOpenMenu(!openMenu)}>
        <Link className=" text-lg " to="/organicFruits">
          OrganicFruits
        </Link>
      </li>
      <li className="" onClick={() => setOpenMenu(!openMenu)}>
        <Link className=" text-lg " to="/aboutUs">
          about
        </Link>
      </li>
      <li className="" onClick={() => setOpenMenu(!openMenu)}>
        <Link className=" text-lg " to="/contact">
          Contact
        </Link>
      </li>
      
      {
        user?.uid ? <> <li className="logout" onClick={LogOUT}>
        <Link className=" text-lg">Log Out</Link>
      </li> </> : <>
      <li className="register" onClick={() => setOpenMenu(!openMenu)}>
        <Link className=" text-lg " to="/register">
          Register
        </Link>
      </li>
      <li className="login" onClick={() => setOpenMenu(!openMenu)}>
        <Link className=" text-lg " to="/login">
          Login
        </Link>
      </li></>
      }
    </React.Fragment>
  );

  return (
    <div className="navBar bg-yellow-500">
    <nav className=" flex justify-between py-6 px-[8%] items-center">
      <div className="logo flex">
        <Link to="/home">
          <img src={logo} alt="" className=" logo1 w-16 h-16" />
        </Link>

        
      </div>
      {openMenu ? <ul className="menuItem items-center">{menuItem}</ul> : <ul className="menuItems items-center">{menuItem}</ul>}
      <div className="relative BarsBar" onClick={() => setOpenMenu(!openMenu)}>
        {openMenu ? (
          <button className="bars">
            <FaBars className="w-6 h-6 text-white"/>
          </button>
        ) : (
          <button className="closeBar">
            <FaWindowClose className="w-6 h-6 text-white"/>
          </button>
        )}
      </div>
    </nav>
  </div>
  );
};

export default TopHeader;
