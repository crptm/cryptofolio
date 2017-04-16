// @flow

import React, { Component } from "react";
import localforage from "localforage";
import App from "./App";

type State = {
  symbols: SymbolRecordT[],
  version: number
};

export default class Container extends Component {
  state: {
    state?: State
  } = {};

  componentDidMount() {
    this.init();
  }

  async init() {
    localforage.config();
    var state: State = await localforage.getItem("state");
    console.info("Got state", state);
    this.setState({ state: state || {} });
  }

  render() {
    if (!this.state.state) {
      return null;
    }

    return <App {...this.state.state} addSymbol={this.handleAddSymbol} />;
  }

  handleAddSymbol = (amount: number, symbol: string) => {
    if (!this.state.state) {
      throw new Error("should never happen");
    }
    const symbols = this.state.state.symbols || [];
    const index = symbols.findIndex(x => x.symbol === symbol);
    if (index === -1) {
      symbols.push({ symbol, amount });
    } else {
      const oldVal = symbols[index];
      symbols[index] = { symbol, amount: amount + oldVal.amount };
    }
    this.storeState({ ...this.state.state, symbols });
  };

  async storeState(state: State) {
    await localforage.setItem("state", { ...state, version: 1 });
    this.setState({ state });
  }
}
