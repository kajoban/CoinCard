import React, { Component } from 'react';
import './App.css';

//for api requests to coin data 
const request = require('request');
const apikey = 'AC48C219-0223-4FB0-A290-F67F34F02A07'

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

  render() { //app comonent made of search box (for api requests) and card (for displaying data)
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

//search box component 
class SearchBox extends Component {
  render() {
    return (
      <form
        className='searchbox'
        onSubmit={this.handleClick.bind(this)}>

        <input
          ref='search'
          className='searchbox_input'
          id='searchtext'
          type='text'
          placeholder='Enter coin...'
          list='coins'>
        </input>
        <datalist id='coins'>
            <option value='BTC'/>
            <option value='BCH'/>
            <option value='ETH'/>
            <option value='ZEC'/>
            <option value='XMR'/>
            <option value='LTC'/>
            <option value='WTC'/>
            <option value='ETC'/>
            <option value='XRP'/>
            <option value='NEO'/>
            <option value='DOGE'/>
        </datalist>
        <br/>
        <input
          type='submit'
          className='searchbox_button'
          class='btn btn-outline-success'
          id='gobtn'
          value='Search Coin'>
        </input>

      </form>
    )
  }

  handleClick(e) {
    e.preventDefault()
    let coin = this.refs.search.value //get input from search box on click
    coin = coin.toUpperCase() //cleanse input 
    this.props.fetchCoin(coin) //on click, make an api request 
    this.refs.search.value = '' //reset value in search box to blank
  }
}

class Card extends Component {
  render() {
    let data = this.props.data //get data

    if (data.notFound) { //handle error 
      return (
        <h3 id='datatitle'>{data.notFound}</h3> 
      )
    } else { //display infromation 
      return (
        <div>
          <h2 id='datatitle'>Rate:</h2>
          <p id='datatext'>$1 {data.quote} = ${data.rate} {data.base}</p>
        </div>
      )
    }


  }
}

class Title extends Component{
  render(){
    return(
      <h1 id='titletext'>Coin Card <span role='img'>📈</span></h1>
    )
  }
}

class Footer extends Component{
  render(){
    return(
      <p id='footertext'>Built by Kajoban with <span role='img'>⚛️ + ❤️</span></p>
    )
  }
}

export default App;
