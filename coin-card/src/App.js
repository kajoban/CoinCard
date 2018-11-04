import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const request = require('request');

const apikey = 'AC48C219-0223-4FB0-A290-F67F34F02A07'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      base: 'BTC',
      quote: 'USD',
      rate: '',
      notFound: ''
    }
  }

  render() {
    return (
      <div>
        <SearchBox fetchCoin={this.fetchCoin.bind(this)}/>
        <Card data={this.state}/>
      </div>
    )
  }

  fetchApi(url) {

    console.log(url)

    fetch(url).then((res) => res.json()).then((data) => {
      
      this.setState({
        base: data.asset_id_base,
        quote: data.asset_id_quote,
        rate: data.rate,
        notFound: data.error
      })
    }).catch((err) => console.log('oh snap!'))
  }

  fetchCoin(coin) {
    let url = `https://rest.coinapi.io/v1/exchangerate/${coin}/USD?apikey=${apikey}`
    this.fetchApi(url)
  }

  componentDidMount() {
    let url = `https://rest.coinapi.io/v1/exchangerate/${this.state.base}/USD?apikey=${apikey}`
    this.fetchApi(url)
  }

}

class SearchBox extends Component {
  render() {
    return (
      <form
        className="searchbox"
        onSubmit={this.handleClick.bind(this)}>

        <input
          ref="search"
          className="searchbox_input"
          type="text"
          placeholder="type coin...">
        </input>

        <input
          type="submit"
          className="searchbox_button"
          value="Search Coin">
        </input>

      </form>
    )
  }

  handleClick(e) {
    e.preventDefault()
    let coin = this.refs.search.value
    coin = coin.toUpperCase()
    this.props.fetchCoin(coin)
    this.refs.search.value = " "
  }
}

class Card extends Component {
  render() {
    let data = this.props.data

    if (data.error) {
      return (
        <h3>Coin not found</h3>
      )
    } else {
      return (
        <div>
          <h2>Base</h2>
          {data.base}
          <h2>Quote</h2>
          {data.quote}
          <h1>Rate</h1>
          {data.rate}
        </div>
      )
    }


  }
}

export default App;
