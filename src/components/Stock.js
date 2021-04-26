import React, { Component } from 'react'
import { Button } from "react-bootstrap"
import { BloxyLink } from '../config.js'
import "../stylesheet/nav.css";
class Stock extends Component {

    render() {
      return (
      <Button variant="outline-primary" className="buttonsAdditional" href={BloxyLink + this.props.address} target="_blank">View details</Button>
      )
    }
  }
  
  export default Stock;
