import React, { Component } from "react";
import Header from "./Header/Header";
import UserInput from "./Input/UserInput";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <UserInput />
      </div>
    );
  }
}

export default LandingPage;
