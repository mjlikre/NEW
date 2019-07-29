import React, { Component } from 'react';
import Button from "./../components/Button/counterButton"

class Counter extends Component {
    state = {
        counter: 0
      }
    
      handleIncrement = () =>{
        this.setState({ counter: this.state.counter + 1});
      }
    
      handleDecrement = () =>{
        this.setState({ counter: this.state.counter - 1});
      }
    
    render(){
        return(
            <div>
            <h1>
                Counter
            </h1>
            <p>counter: {this.state.counter}</p>
            <Button handleClick = {this.handleIncrement}>increase</Button>
            <Button handleClick = {this.handleDecrement}>decrease</Button>
            </div>
        )
    }
}

export default Counter;