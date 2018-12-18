import React from 'react';
import './styles.scss'

export default function () {
  const handleClick = ()=>{
    alert("Hey, this is an example!");
  };

  return <div className="example-container">
    <button type="button" onClick={handleClick} >test</button>
  </div>
}