import React from 'react'
import Navbar from '../Component/Navbar'
import BookGrid from '../Component/BookGrid'


const Books = () => {
  return (
    <div className="bg-green-50">
      <Navbar/>
      <BookGrid isHome={false} showBorrowButton={true} showEditButton = {false} showDeleteButton = {false}/>
    </div>
  )
}

export default Books