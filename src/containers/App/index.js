import React, { Component } from 'react';

class App extends Component{
  //A container does data fetching and then renders its corresponding sub-component.

  render() {
    if(localStorage.loggedIn){
    return (
      <div className="App">
        <h1>You're logged in Daddio, check out your TODOS on your userpage!</h1>
      </div>
    );
    } else {
    return(
      <div className="App">
        <h1>You gotta log in to create a To-Do list</h1>
        If you're just visiting, try using this login info: username, "Ricky", password "Password"
      </div>
      );
    }
  }
}



export default App;