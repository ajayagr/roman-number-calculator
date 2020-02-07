import React from "react";
import Calculator from "./containers/Calculator/Calculator";

import classes from './App.module.css';

const App = props => {
  return (
    <div className = {classes.App}>
      <div className={classes.Main}>
        <Calculator />
      </div>
    </div>
  )
}

export default App;
