import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import { getAirQuality } from './getAirQuality'

class App extends Component {
  state = {
    loading: false,
    zip_code: '',
    o3: '',
    pm2: ''
  }
  handleOnChange = event => {
    const zip_code = event.target.value
    this.setState(state => ({ ...state, zip_code }))
  }
  handleOnSubmit = async event => {
    event.preventDefault()
    this.setState(state => ({ ...state, loading: true }))
    const { o3, pm2 } = await getAirQuality(this.state.zip_code)
    this.setState(state => ({ ...state, o3, pm2, loading: false }))
  }
  renderHeading = () =>
    this.state.zip_code.length === 5 ? (
      <h2>{`Current Air Quality for ${this.state.zip_code}`}</h2>
    ) : (
      <h2>Enter a zip code to get the current air quality</h2>
    )
  renderData = () =>
    this.state.loading ? (
      <h1>Loading...</h1>
    ) : this.state.o3 && this.state.pm2 ? (
      <ul>
        <li>{`O3: ${this.state.o3}`}</li>
        <li>{`PM2: ${this.state.pm2}`}</li>
      </ul>
    ) : null
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.renderHeading()}
        {this.renderData()}
        <form onSubmit={this.handleOnSubmit}>
          <label htmlFor="zip_code" />
          <input
            onChange={this.handleOnChange}
            type="text"
            value={this.state.zip_code}
          />
        </form>
      </div>
    )
  }
}

export default App
