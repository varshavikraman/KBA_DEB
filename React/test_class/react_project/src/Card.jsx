import React, { useState } from 'react'

const Card = ({title,text,customClassess}) => {
  const [likes,setLikes] = useState(0);
  const [titlecolor,setTitlecolor] = useState('text-rose-600');
  
  const toggleTitlecolor =() => {
    setTitlecolor((prevColor) =>
      prevColor === 'text-rose-600' ? 'text-black' : 'text-rose-600'
    );
  }

  return (
    <div className={`max-w-md rounded overflow-hidden shadow-xl p-4 bg-white ${customClassess}`}>
        <h2 className={`font-bold text-xl mb-2  ${titlecolor}`}>{title}</h2>
        <p className='font-base text-gary-100'>{text}</p>
        <button className='mt-2 px-4 py-2 bg-orange-300 text-white rounded hover:bg-rose-500' onClick={()=>setLikes(likes+1)}>
          Likes:{likes}
        </button>
        <button className='mt-2 px-4 py-2 bg-teal-300 text-white rounded hover:bg-purple-500' onClick={toggleTitlecolor}>
          Toggle Title Color
        </button>
    </div>
  )
}

export default Card