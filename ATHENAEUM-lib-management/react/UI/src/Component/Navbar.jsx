import React from 'react'
import { Link } from "react-router-dom";
import logo from '../assets/image/atheneum-logo.png';

const Navbar = () => {
  return (
    <div>
        <div className="flex justify-between bg-lime-700 h-20">
            <div className="flex">
                <img src={logo} alt="logo" className="size-12 my-4 mr-4"/>
                <input type="search" placeholder="Search for books" className=" border border-gray-400  h-7 my-6"/>
                <button type="submit" className="bg-green-500 h-7 my-6">Search</button>
            </div>
            <div className="space-x-6 mr-8 my-6">
                <Link to="home.html" className="text-lg font-medium hover:bg-green-50">Home</Link>
                <Link to="viewbooks.html" className="text-lg font-medium hover:bg-green-50">Books</Link>
                <Link to="issuebook.html" className="text-lg font-medium hover:bg-green-50">Issue of Book</Link>
                <Link to="returnbook.html" className="text-lg font-medium hover:bg-green-50">Return of Book</Link>
                <Link to="login.html" className="text-lg font-medium hover:bg-green-50">Logout</Link>
             </div>
        </div>
    </div>
  )
}

export default Navbar