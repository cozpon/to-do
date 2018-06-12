import React, { Component } from 'react';

class App extends Component{
  //A container does data fetching and then renders its corresponding sub-component.

  render() {
    if(localStorage.loggedIn){
    return (
      <div className="App">
      <center>
        <h1>You're logged in Daddio, check out your TODOS on your userpage!</h1>
      </center>
      </div>
    );
    } else {
    return(
      <div className="App">
      <center>
        <h1>You gotta log in to create a To-Do list</h1>
        If you're just visiting, try using this login info: <br/><br/> username: <b>Ricky</b> <br/>password: <b>Password</b>
      </center>
      </div>
      );
    }
  }
}



export default App;