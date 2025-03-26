import React from 'react';
import Navbar from '../Component/Navbar';
import DashBar from '../Component/DashBar';
import BookGrid from '../Component/BookGrid';

const DashBoard = () => {
  return (
    <div className="h-screen flex flex-col bg-lime-100">
      {/* Navbar on top */}
      <Navbar />
      
      <div className="flex flex-1">
        {/* Sidebar on the left */}
        <DashBar />
        
        {/* Content taking the remaining space */}
        <div className="flex-1 overflow-y-auto p-10">
          <BookGrid isHome={true} showBorrowButton={false} showEditButton = {true} showDeleteButton = {true}/>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
