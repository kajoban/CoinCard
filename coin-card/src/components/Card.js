import React, { Component } from 'react';

class Card extends Component {
    render() {
      let data = this.props.data //get data
  
      if (data.notFound) { //handle error 
        return (
          <h3 id='datatitle'>{data.notFound}</h3> 
        )
      } else { //display infromation 
        return (
          <div>
            <h2 id='datatitle'>Rate:</h2>
            <p id='datatext'>$1 {data.quote} = ${data.rate} {data.base}</p>
          </div>
        )
      }
  
  
    }
  }

  export default Card; 