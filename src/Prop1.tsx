import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Prop2 from './prop2'
export const Prop1 = () => {
  const [prop,setProp] = useState(0)
    const handleOnClick = () =>{
      setProp(prop+1)
    }
  return (
    <div onClick={handleOnClick}><Link to = "/prop2">prop1</Link></div>
  )
}

export default Prop1
