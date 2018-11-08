import React, { Component } from 'react';

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

  export default SearchBox;