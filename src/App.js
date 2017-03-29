import React, { Component } from 'react';
import './App.css';

import TickerData from './mock.json';


const CONFIG =
  {
    'BTC': 1,
    'ETH': 1,
  }

function getValue(symbol, amount) {
  const data = TickerData.find(x => x.symbol === symbol)
  console.log(data)
  return (+data.price_usd * amount).toFixed(2)
}

class App extends Component {
  render() {
    return (
      <div>
        {Object.keys(CONFIG).map(key => <div className={'row'}><div className={'symbol'}>{key}</div><div>{getValue(key, CONFIG[key])}</div></div>)}
        <div className={'row'}><div className={'symbol'}>TOTAL</div><div>{Object.keys(CONFIG).reduce((acc, key) => +getValue(key, CONFIG[key]) + acc, 0)}</div></div>
      </div>
    );
  }
}

export default App;
