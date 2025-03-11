import React from 'react'
import Navbars from "../components/Navbars";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
  return (
    <>
      <Navbars />
      <Outlet />
      <ToastContainer />
    </>
  )
}

export default MainLayout