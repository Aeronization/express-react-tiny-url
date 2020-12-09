import React, { Component } from 'react';
import axios from 'axios';
import validator from 'validator';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: "",
      link: ""
    };
  }


  // Update the state.
  handleChange = (e) => {
    this.setState({
      url: e.target.value
    })
  };

  // Sent post request to server to get back tiny url.
  handleSubmit = (e) => {
    e.preventDefault();

    const validUrl = validator.isURL(this.state.url, {
      require_protocol: true
    });

    if (!validUrl) {
      alert('Please ensure the url is valid. Include the http protocol.')
    } else {
      axios.post('http://localhost:5000/api/shorten', {
        url: this.state.url
      })
      .then(response => {
        console.log(response)
        this.setState({
          link: `http://localhost:5000/${response.data.hash}`
        })
      })
    }
  }

  render() {
    return (
      <div className="App">

        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <input type="text" className="form-control" placeholder="Enter URL including http protocol" onChange={this.handleChange}></input>
            <input type="submit" value="Shrink" className = "btn btn-success" />
          </fieldset>

          <fieldset>
            <a href={this.state.link}>{this.state.link}</a>
          </fieldset>
        </form>

      </div>
    )
  };
}

export default App;

