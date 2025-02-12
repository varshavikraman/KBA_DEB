import React from 'react'

export const Demo = () => {
  const name = 'Athira';
  const x = 10;
  const y = 20;

  const names = ['Ram', 'Akhil', 'Sara', 'Maria'];

  const Passed = true;

  return (
    <>
    <div className='text-5xl'>App</div>
    <p>Hello {name}</p>
    <p>The {x} and {y} sum is {x+y}</p>
    <ul>
        {names.map((name,index)=>(
            <li key={index}>{name}</li>
        ))}
    </ul>
     {Passed? <h1>You have Passed</h1>:<h1>You have failed</h1>}
    </>
  )
}

export default Demo
