import React, { Component } from 'react';
import './App.css';
// Import Axios - Promise based HTTP client for the browser and node.js
import axios from 'axios';
// Import the Output Component
import Output from './Components/Output';
// Import the Select Component
import Select from './Components/Controls/Select';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      paras: 5,
      format: 'html',
      text: ''
    }

  }
  // componentWhileMount as we make a request to an API 
  componentWillMount(){
    this.getSampleText();
  }
  
  getSampleText(){
    axios.get('https://baconipsum.com/api/?type=meat-and-filler&paras='+this.state.paras+'&format='+this.state.format)
    .then(response=>{
      this.setState({text: response.data}, function(){
        console.log(this.state);
      });
    })
    .catch(err=>{
      console.log(err);
    })
  }

  showHtml(x){
    // change value and return a new sample text
    this.setState({format: x}, this.getSampleText);
  }
  render() {
    return (
      // Add container class to center everything
      <div className="App container">
        <h1>Text Generator & React</h1>
        <hr/>
        <form className="form-inline">
          <div className="form-group">
            <label>Output Format</label>
            <Select value={this.state.format} onChange={this.showHtml.bind(this)}/>
          </div>
        </form>
        <Output value={this.state.text}/>
      </div>
    );
  }
}

export default App;
