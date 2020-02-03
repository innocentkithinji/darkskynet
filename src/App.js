import React, { Component } from "react";
import "./App.css";
import Home from "./components/Home";
import { Provider } from "react-redux";
import configureStore from "./store";
const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App" style={{ height: "100vh" }}>
          <Home />
        </div>
      </Provider>
    );
  }
}

export default App;
