import React from 'react';
import bgImage from "../assets/image/Pasted image.png";
import logo from '../assets/image/atheneum-logo.png';

const SignUp = () => {
  return (
    <div 
      className="h-screen w-screen bg-cover bg-center" 
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >

      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex flex-col md:flex-row items-center space-x-4">
        <img src={logo} alt="logo" className="w-16 h-16 md:w-20 md:h-20" />
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-green-800">ATHENAEUM</h1>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center h-full px-5 md:px-10 lg:px-20 space-y-10 lg:space-y-0 lg:space-x-16">

        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <p className="text-2xl md:text-3xl font-mono font-medium">Unveil a Realm of Wisdom</p>
          <p className="text-lg md:text-xl my-3">Step into a world where knowledge gleams, A digital haven spun from dreams with books and treasures at your command. Just a click away.</p>
          <p className="text-lg md:text-xl my-3">Explore the pages that whisper and sing, A wellspring of wonder, where ideas take wing.</p>
          <p className="text-lg md:text-xl my-3">In our <b className="font-mono text-2xl md:text-3xl text-green-950">ATHENAEUM</b>, Unlock the secrets, let inspiration flow and your curiosity grow.</p>
        </div>

        <div className="w-full lg:w-1/2 max-w-lg bg-white rounded-2xl shadow-lg shadow-green-500 p-8">
          <h2 className="text-lime-500 text-2xl md:text-3xl font-medium text-center">Sign Up</h2>

          <form>
            <div className="pt-4">
              <label className="block">Name:</label>
              <input type="text" required className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>

            <div className="pt-4">
              <label className="block">Username:</label>
              <input type="text" required className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>

            <div className="pt-4">
              <label className="block">Password:</label>
              <input type="password" required className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>

            <div className="pt-4">
              <label className="block">UserRole:</label>
              <input type="text" required className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>

            <div className="pt-6 text-center">
              <button 
                type="submit" 
                className="w-36 h-12 text-green-200 bg-green-800 font-medium rounded-lg hover:bg-lime-600 hover:text-white transition"
              >
                <a href="user_login.html">Sign Up</a>
              </button>
            </div>

            <div className="pt-4 text-center">
              <p>Already have an account? <a href="user_login.html" className="text-green-700 hover:text-emerald-500">Login</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
