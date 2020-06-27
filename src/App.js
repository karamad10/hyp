import React, { createContext, useReducer, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import { initialState, reducer } from "./store/reducer";

export const AuthContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [data, setData] = useState({});
  console.log("data", data);

  useEffect(() => {
    async function fetchData() {
      try {
        let data = await (await fetch("/login")).json();
        setData(data.message);
      } catch (err) {
        setData(err.message);
      }
    }
    fetchData();
  });

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
