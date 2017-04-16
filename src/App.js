// @flow
import React from "react";
import "./App.css";

import TickerData from "./mock.json";

const Data: TickerDataT = TickerData;

function getValue(symbol: string, amount: number) {
  const data = Data.find(x => x.symbol === symbol);
  if (typeof data === "undefined") {
    return null;
  }
  return +data.price_usd * amount;
}

function Symbols(props) {
  if (!props.symbols || !props.symbols.length) {
    return <div>{"Empty"}</div>;
  }
  return (
    <div>
      {props.symbols.map(x => (
        <SymbolRow key={x.symbol} symbol={x.symbol} amount={x.amount} />
      ))}
    </div>
  );
}

function SymbolRow(props) {
  const value = getValue(props.symbol, props.amount);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: 50 }}>{props.symbol}</div>
      <div style={{ width: 100, textAlign: "right" }}>{props.amount}</div>
      <div style={{ width: 100, textAlign: "right" }}>
        ${value === null ? "???" : value.toFixed(2)}
      </div>
    </div>
  );
}

class AddSymbol extends React.Component {
  state = {
    symbol: "",
    amount: ""
  };
  render() {
    return (
      <div>
        <input
          name="symbol"
          value={this.state.symbol}
          placeholder="symbol"
          onChange={this.handleChange}
        />
        <input
          name="amount"
          value={this.state.amount}
          placeholder="amount"
          onChange={this.handleChange}
        />

        <button onClick={this.handleAdd}>Add</button>
      </div>
    );
  }

  handleChange = (e: SyntheticInputEvent) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleAdd = () => {
    this.props.add(+this.state.amount, this.state.symbol);
    this.setState({
      symbol: "",
      amount: ""
    });
  };
}

export default class App extends React.Component {
  props: {
    addSymbol: (amount: number, symbol: string) => void,
    symbols: SymbolRecordT[]
  };
  render() {
    return (
      <div>
        <Symbols symbols={this.props.symbols} />
        <AddSymbol add={this.props.addSymbol} />
      </div>
    );
  }
}
