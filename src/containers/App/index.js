import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { loadCards } from '../../actions/cards';
// import { getPriorities } from '../../actions/priorities';
// import { getUsers } from '../../actions/users';

// import NewCardForm from '../NewCardForm';
// import CardList from '../CardList';

class App extends Component{
  constructor(){
    super();
  }


  componentDidMount(){
  }

  // A container does data fetching and then renders its corresponding sub-component.

  render() {
    return (
      <div className="App">
        <h1>Welcome 2 hell!</h1><br/><br/>
      </div>
    );
  }
}


export default App;