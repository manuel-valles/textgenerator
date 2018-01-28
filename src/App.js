import React, { Component } from 'react';
import './App.css';
// Import Axios - Promise based HTTP client for the browser and node.js
import axios from 'axios';
// Import the Output Component
import Output from './Components/Output';
// Import the Select Component
import Select from './Components/Controls/Select';
// Import the Select Component
import Text from './Components/Controls/Text';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      paras: 3,
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

  changeParas(y){
    // change value and return a new sample text
    this.setState({paras: y}, this.getSampleText);
  }

  render() {
    return (
      // Add container class to center everything
      <div className="App container">
        <h1 className="text-center">Text Generator & React</h1>
        <hr/>
        <form>
          <div className="form-row">
            <div className="form-group col-sm-2">
              <label>Paragrahs: </label>
              <Text value={this.state.paras} onChange={this.changeParas.bind(this)}/>
            </div>
            <div className="form-group col-sm-3 offset-sm-1">
              <label>Output Format: </label>
              <Select value={this.state.format} onChange={this.showHtml.bind(this)}/>
            </div>
          </div> 
        </form>
        <Output value={this.state.text}/>
      </div>
    );
  }
}

export default App;
