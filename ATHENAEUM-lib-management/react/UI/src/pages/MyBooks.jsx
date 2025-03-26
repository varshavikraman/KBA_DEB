import React from 'react'
import Navbar from '../Component/Navbar'
import BorrowedGrid from '../Component/BorrowedGrid'

const MyBooks = () => {
  return (
    <div className="bg-green-50">
      <Navbar/>
        <BorrowedGrid/>
    </div>
  )
}

export default MyBooks