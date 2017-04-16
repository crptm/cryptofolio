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
        <SymbolRow
          key={x.symbol}
          symbol={x.symbol}
          amount={x.amount}
          onChange={props.onChange}
        />
      ))}
      <div style={{ display: "flex" }}>
        <div style={{ width: 150 }}>TOTAL</div>
        <div style={{ width: 100, textAlign: "right" }}>
          ${props.symbols
            .reduce((acc, item) => {
              return acc + getValue(item.symbol, item.amount);
            }, 0)
            .toFixed(2)}
        </div>
      </div>
    </div>
  );
}

class SymbolRow extends React.Component {
  state = {
    editing: false,
    amount: ""
  };

  render() {
    const { symbol, amount } = this.props;
    const value = getValue(symbol, amount);

    return (
      <div style={{ display: "flex" }}>
        <div style={{ width: 50 }}>{symbol}</div>
        <div style={{ width: 100, textAlign: "right" }}>
          {this.state.editing
            ? <input
                name="amount"
                value={this.state.amount}
                placeholder="amount"
                onChange={this.handleChange}
              />
            : amount}
        </div>
        <div style={{ width: 100, textAlign: "right" }}>
          ${value === null ? "???" : value.toFixed(2)}
        </div>
        <div style={{ marginLeft: 10 }}>
          {this.state.editing
            ? [
                <a
                  onClick={this.handleSave}
                  key={"save"}
                  style={{
                    textDecoration: "underline",
                    cursor: "pointer"
                  }}
                >
                  Save
                </a>,
                " ",
                <a
                  key={"cancel"}
                  onClick={this.handleCancel}
                  style={{
                    textDecoration: "underline",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </a>
              ]
            : <a
                onClick={this.handleEdit}
                style={{
                  textDecoration: "underline",
                  cursor: "pointer"
                }}
              >
                {this.state.editing ? "Save" : "Edit"}
              </a>}

        </div>
      </div>
    );
  }

  handleEdit = () => {
    this.setState({ editing: true, amount: this.props.amount });
  };

  handleChange = (e: SyntheticInputEvent) => {
    this.setState({ amount: e.target.value });
  };

  handleCancel = () => {
    this.setState({ editing: false });
  };

  handleSave = () => {
    const amount = isNaN(+this.state.amount)
      ? this.props.amount
      : +this.state.amount;
    this.props.onChange(amount, this.props.symbol);
    this.setState({ editing: false });
  };
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
    changeSymbol: (amount: number, symbol: string) => void,
    symbols: SymbolRecordT[]
  };
  render() {
    return (
      <div>
        <Symbols
          symbols={this.props.symbols}
          onChange={this.props.changeSymbol}
        />
        <AddSymbol add={this.props.addSymbol} />
      </div>
    );
  }
}
