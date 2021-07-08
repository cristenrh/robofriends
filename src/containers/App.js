import React from 'react';
import CardList from '../components/CardList.js';
import { robots } from '../robots';
import SearchBox from '../components/SearchBox.js';
import Scroll from '../components/Scroll.js';
import {Scroll} from '../components/Scroll.js';
import ErrorBoundary from '../components/ErrorBoundary.js';

import './App.css';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      robots: robots,
      searchfield: ''
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => this.setState({ robots: users}));
}

  onSearchChange = (event) => {
    this.setState({searchfield: event.target.value})
  }

  render() {
    const filteredRobots = this.state.robots.filter(robot =>{
      return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
    });
    if(!this.state.robots.length){
      return <h1>Loading</h1>
    } else {
    return (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
            <SearchBox searchChange={this.onSearchChange}/>
            <Scroll>
              <ErrorBoundary>
            <CardList robots={filteredRobots} />
            </ErrorBoundary>
            </Scroll>
      </div>
    )
    }
  }
}


export default App;

