import React, { Component } from 'react';

export default class Home extends Component {
  constructor() {
    super()

    this.state = {
      clicked: false
    }
  }
  render() {
    return (
      <div>
        <h1>Home page mock</h1>
        <h3>{this.state.clicked ? "CLICKED" : "NOT CLICKED"}</h3>
        <button onClick={() => this.setState({ clicked: !this.state.clicked })}>click</button>
      </div>
    );
  }
}
