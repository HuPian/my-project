import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss'

export default function Example ({name}) {
  const handleClick = ()=>{
    alert("Hey, this is an example!");
  };

  return <div className="example-container">
    <button type="button" onClick={handleClick} >{name}</button>
  </div>
}
Example.propTypes = {
  name: PropTypes.string,
};
Example.defaultProps={
  name:"test",
};
