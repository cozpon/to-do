import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { loadCards } from '../../actions/cards';
// import { getPriorities } from '../../actions/priorities';
//import { loadUser } from '../../actions/users';

// import NewCardForm from '../NewCardForm';
// import CardList from '../CardList';

class App extends Component{
  constructor(){
    super();
  }


  componentDidMount(){
   // this.props.loadUser();
  }

  // A container does data fetching and then renders its corresponding sub-component.

  render() {
    return (
      <div className="App">
        <h1>Temporary To-Do List
        <br />(Will go away if you leave the page, unless you log-in)</h1><br/><br/>
      </div>
    );
  }
}


export default App;