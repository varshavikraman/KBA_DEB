import React from 'react'
import Navbar from '../Component/Navbar'
import BookGrid from '../Component/BookGrid'

const Home = () => {
  return (
    <div className="bg-green-50">
      <Navbar/>
      <BookGrid isHome={true} showBorrowButton={true} showEditButton = {false} showDeleteButton = {false}/>
    </div>
  )
}

export default Home