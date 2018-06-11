import React, { Component } from 'react';
//import { connect } from 'react-redux';
// import { loadCards } from '../../actions/cards';
// import { getPriorities } from '../../actions/priorities';
// import { loadUser } from '../../actions/users';

// import NewToDoForm from '../NewToDoForm';
// import CardList from '../CardList';

import NewToDoForm from '../NewToDoForm';

class App extends Component{
  // constructor(){
  //   super();
  //}


  // componentDidMount(){
  //  // this.props.loadUser();
  // }

  // A container does data fetching and then renders its corresponding sub-component.

  render() {
    return (
      <div className="App">
        <NewToDoForm />
        <h1>Things To-Do in the Futura</h1>
      </div>
    );
  }
}


export default App;