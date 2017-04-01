import React from 'react'
import './App.css';

import TickerData from './mock.json';

function getValue(symbol, amount) {
  const data = TickerData.find(x => x.symbol === symbol)
  return (+data.price_usd * amount).toFixed(2)
}


function Symbols(props) {
  if (!props.symbols || !props.symbols.length) {
    return <div>{'Empty'}</div>;
  }
  return <div>{props.symbols.map(x => <SymbolRow key={x.symbol} symbol={x.symbol} amount={x.amount} />)}</div>;
}


function SymbolRow(props) {
  return (
    <div style={{display: 'flex'}}>
      <div style={{width: 50}}>{props.symbol}</div>
      <div style={{width: 100, textAlign: 'right'}}>{props.amount}</div>
      <div style={{width: 100, textAlign: 'right'}}>${getValue(props.symbol, props.amount)}</div>
    </div>
  );
}


class AddSymbol extends React.Component {
  state = {
    symbol: '',
    amount: ''
  }
  render() {
    return (
      <div>
        <input name="symbol" value={this.state.symbol} placeholder="symbol" onChange={this.handleChange}/>
        <input name="amount" value={this.state.amount}  placeholder="amount" onChange={this.handleChange}/>

        <button onClick={this.handleAdd}>Add</button>
      </div>
    );
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleAdd = () => {
    this.props.add(+this.state.amount, this.state.symbol);
    this.setState({
      symbol: '',
      amount: ''
    })
  }
}


export default class App extends React.Component {
  render() {
    return (
      <div>
        <Symbols symbols={this.props.state.symbols} />
        <AddSymbol add={this.props.addSymbol} />
      </div>
    )
  }
}
