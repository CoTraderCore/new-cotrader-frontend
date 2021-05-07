import React, { Component } from 'react'

import { BloxyLink } from '../config.js'
import "../stylesheet/nav.css";
class Stock extends Component {

    render() {
      return (
      <a variant="outline-primary" class="graphtodisplay" href={BloxyLink + this.props.address} target="_blank">View details</a>
      )
    }
  }
  
  export default Stock;
