import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles.scss'

export default class Demo extends Component{
  static propTypes = {
    name: PropTypes.string,
  };
  static defaultProps={
    name:"demo",
  };

  handleClick = ()=>{
    alert("Hey, this is a demo!");
  };

  render(){
    return <div className="example-container">
      <button type="button" onClick={this.handleClick} >{this.props.name}</button>
    </div>
  }

}
