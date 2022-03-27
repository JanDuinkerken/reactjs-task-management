
import React, { Component } from 'react'
  
class Test extends Component {
  render() {
    return (
      <div>
        <h1>{localStorage.getItem("token")}</h1>
      </div>
    )
  }
}

export default Test;