//For calculator button
import React from "react";
import classes from "./Button.module.css";

//Check for operators
const isOperator = val => {
  const result =  /^[a-z]+$/i.test(val);;
  // console.log(val, result);
  return result; 
};

const Button = props => {
  //For showing value on hover
  const romanNumeral = {
    M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1
  }
  const val = romanNumeral[props.children] ? `(${romanNumeral[props.children]})` : null;

  //Adding required classes
  const btnClass = [classes.Button];
  btnClass.push(!isOperator(props.children) ? classes.Operator: null);
  btnClass.push(props.clearButton ? classes.ClearBtn: null);
  btnClass.push(props.backspace ? classes.BackSpace: null)
  // console.log(props.children, props.disabled);
  
  return(
      <button 
      style={props.style}
      className={btnClass.join(' ')}
      disabled = {props.disabled}
      onClick={() => props.handleClick(props.children)}>
      {props.children}<span className={classes.Value}>{val}</span></button>
  )
};

export default Button;