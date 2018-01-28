import React, { Component } from 'react';
import './App.css';
// Import Axios - Promise based HTTP client for the browser and node.js
import axios from 'axios';
// Import the Output Component
import Output from './Components/Output';

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
    axios.get('https://baconipsum.com/api/?type=meat-and-filler&paras='+this.state.paras+'&format=html')
    .then(response=>{
      this.setState({text: response.data}, function(){
        console.log(this.state);
      });
    })
    .catch(err=>{
      console.log(err);
    })
  }
  render() {
    return (
      <div className="App">
        <Output value={this.state.text}/>
      </div>
    );
  }
}

export default App;
