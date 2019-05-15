import React, { Component } from 'react';

import '../styles/App.css';
import Card from './Card';
import SearchBox from './SearchBox';
import Title from './Title';
import Footer from './Footer';

//for api requests to coin data 
const request = require('request');
const apikey = '707C88E4-84EE-4E2F-A7F7-8D1F92DDBE3A'

//main app component
class App extends Component {
  constructor(props) {
    super(props);

    this.state = { //state is made up of these 4 properties 
      base: 'BTC',
      quote: 'USD',
      rate: '',
      notFound: ''
    }
  }

  render() { //app component made of search box (for api requests) and card (for displaying data)
    return (
      <div>
        <Title/>
        <SearchBox fetchCoin={this.fetchCoin.bind(this)} /> 
        <Card data={this.state} />
        <Footer/>
      </div>
    )
  } //api request is a prop of search box 
  //app state is a prop of data card 

  fetchApi(url) { //function for api requests 

    console.log(url)

    request(url, (error, response, body) => {
      let data = JSON.parse(body);
      console.log(response.statusCode)
      console.log(url)
      if (response.statusCode === 200) {
        console.log(data);
        this.setState({
          base: data.asset_id_base,
          quote: data.asset_id_quote,
          rate: parseFloat(data.rate).toFixed(5),
          notFound: data.error
        })
      } else {
        console.log('error....')
        this.setState({
          notFound: data.error
        })
      }

    })

  }

  fetchCoin(coin) { //request on button submit 
    let url = `https://rest.coinapi.io/v1/exchangerate/${coin}/USD?apikey=${apikey}`
    this.fetchApi(url)
  }

  componentDidMount() { //automatic request on load in
    let url = `https://rest.coinapi.io/v1/exchangerate/${this.state.base}/USD?apikey=${apikey}`
    this.fetchApi(url)
  }

}

export default App;
