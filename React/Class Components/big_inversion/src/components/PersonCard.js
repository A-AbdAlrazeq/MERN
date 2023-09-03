import React, { Component } from "react";
class PersonCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: this.props.age,
    };
  }
  render() {
    const { firstName, lastName, hairColor } = this.props;
    const { age } = this.state;

    return (
      <div>
        <h2>
          {lastName}, {firstName}
        </h2>
        <p>Age: {age}</p>
        <p>Hair Color: {hairColor}</p>
        <button onClick={() => this.setState({ age: this.state.age + 1 })}>
          Birthday Button for {firstName} {lastName}
        </button>
      </div>
    );
  }
}
export default PersonCard;
