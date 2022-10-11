import React, { useState } from 'react'

function Counter() {

  const [number, setNumber] = useState(0)

  if(number<0){
    setNumber(0)
  }

  const handlePlus = () => {
    setNumber(prev => prev+1)
  }
  const handleMinus = () => {
    setNumber(prev => prev-1)
  }

  return (
    <div className='counter-component'>
      <button onClick={handleMinus}>-</button>
      <span style={{color:'white'}}>{number}</span>
      <button onClick={handlePlus}>+</button>
    </div>
  )
}

export default Counter