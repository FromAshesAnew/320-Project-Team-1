import React, { Component } from 'react';
 
import Task from './Task.jsx';

import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';
import ReactDOM from 'react-dom';
 
// App component - represents the whole app
 class App extends Component {
  handleSubmit1(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = "Current Weight: " + ReactDOM.findDOMNode(this.refs.textInput1).value.trim() + " lbs";
 
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput1).value = '';
  }

  handleSubmit2(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = "Daily Calorie Intake: " + ReactDOM.findDOMNode(this.refs.textInput2).value.trim() + " Calories";
 
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput2).value = '';
  }

  handleSubmit3(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = "Calories Lost Due to Activities: " + ReactDOM.findDOMNode(this.refs.textInput3).value.trim() + " Calories";
 
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput3).value = '';
  }

  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>MyPerfect Size</h1>

          <form className="new-task" onSubmit={this.handleSubmit1.bind(this)} >
            <input
              type="number"
              ref="textInput1"
              placeholder="Enter Current Weight (lbs)"
            />
          </form>

          
          <form className="new-task" onSubmit={this.handleSubmit2.bind(this)} >
            <input
              type="number"
              ref="textInput2"
              placeholder="Enter Daily Calorie Intake"
            />
          </form>

          
          <form className="new-task" onSubmit={this.handleSubmit3.bind(this)} >
            <input
              type="number"
              ref="textInput3"
              placeholder="Enter Calories Lost Due To Activities"
            />
          </form>
        </header>
        
 
        <ul>
          {this.renderTasks()}
        </ul>
        <button id="weight">Calculate my future weight</button>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(App);
