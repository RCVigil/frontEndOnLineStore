import React, { Component } from 'react';

export default class Purchased extends Component {
  state = {
    quantidade: 0,
  };

  render() {
    const { quantidade } = this.state;
    return (
      <div>
        <h6>{ quantidade }</h6>
      </div>
    );
  }
}
