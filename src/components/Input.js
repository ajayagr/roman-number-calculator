//Act as display panel for calculator
import React from "react";
import classes from "./Input.module.css";

const Input = props => <div className={classes.Input} style={props.style}>{props.input}</div>;

export default Input;
