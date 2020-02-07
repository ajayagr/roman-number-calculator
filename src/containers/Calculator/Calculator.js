import React, { Component } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import classes from './Calculator.module.css';

class Calculator extends Component{
    state = {
        numerals: ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'],
        numeralValue:[1000,900,500,400,100,90,50,40,10,9,5,4,1],
        input: "",
        expr: ""
    };

    componentDidMount(){
        alert("Welcome to roman numeral calculator!!\nThis calculator can handle inputs in the range 1 to 3999.");
    }

    //handle clear button; clears input
    handleClear = () => {
        this.setState({ input: "", expr:""});
    };

    //handles =(evaluate) operation and updates values accordingly 
    equalHandler = () => {
        const input = this.state.input;
        const res = this.evalExpr(input);
        this.setState({
            input: Number.isInteger(res) ? this.intToRoman(res) : input, 
            expr:res
        });
    }

    //handle backspace (if invalid calculation is present then clear all)
    handleBackSpace = () => {
        const inp = this.state.input;
        let res = "";
        // const res = inp.substring(0, inp.length-1);
        if(/[^A-Z|+|\-|*]/.test(inp)){
            res = "";
        }else{
            res = inp.substring(0, inp.length-1);
        }

        this.setState({input:res});
        this.inputToExpr(res);
    }

    //Live display of content in secondary panel
    inputToExpr = input => {
        let regex = /(?<input1>[A-Z]+)(?<operator>[^A-Z])?(?<input2>[A-Z]+)?/;
        let res = input.match(regex);
        
        // console.log(input, res);
        if(!res){
            // console.log("done");
            this.setState({expr: ""});
            return;
        }

        let inp1 = res.groups.input1;
        let operator = res.groups.operator;
        let inp2 = res.groups.input2;

        let temp = "";
        if(inp1) {
            let tmp = this.romanToInt(inp1);
            temp += tmp ? tmp : "NaN"; }
        if(operator) {temp += operator;}
        if(inp2) {
            let tmp = this.romanToInt(inp2);
            temp += tmp ? tmp : "NaN";}

        this.setState({expr: temp});
    }

    //handle value input (checks if invalid calc is present then reset and add)
    handleValueInput = val => {
        // console.log(val);
        let newVal = this.state.input;
        if(/[^A-Z|+|\-|*]/.test(newVal)){
            newVal = val;
        }else{
            newVal += val;
        }
        this.setState({ input: newVal });
        this.inputToExpr(newVal);
    };

    //handle operator input (checks if exisiting operator is present then evaluates, if invalid input then reset and add)
    handleOperatorInput = val => {
        // console.log("[handleOperatorInput]");
        const res = this.state.input.match(/[+|\-|*]/g)
        if(res){
            this.equalHandler();
            return;
        }
        let newVal = this.state.input;
        if(/[^A-Z|+|\-|*]/.test(newVal)){
            newVal = "";
        }else{
            newVal += val;
        }

        this.setState({input: newVal});
        this.inputToExpr(newVal);
    }

    //test if input is a valid roman numeral or not (modern strict check 1 to 3999 using regex)
    testValidRoman = input => {
        //Regex for validating
        const regex = /^(?<thousands>M{0,3})?(?<hundreds>CM|DC{0,3}|CD|C{0,3})?(?<tens>XC|LX{0,3}|XL|X{0,3})?(?<ones>IX|VI{0,3}|IV|I{0,3})?$/;
        
        if(!regex.test(input)){
            return false;
        }
        
        const result = input.match(regex);
        // console.log(result);
        
        let temp = "";
        if(result.groups.thousands) { temp += result.groups.thousands; }
        if(result.groups.hundreds) { temp += result.groups.hundreds; }
        if(result.groups.tens) { temp += result.groups.tens; }
        if(result.groups.ones) { temp += result.groups.ones; }
        
        if (temp !== input) { return false; }
        else { return true; }
        //console.log(input.test(regex));
    }

    //converts input value from roman to integer (check if input is valid roman numeral or not)
    romanToInt = input => {
        // console.log("[romanToInt] input = " + input);
        if(!this.testValidRoman(input)){
            // console.log("[romanToInt] Invalid input");
            return false;
        }
        let val = 0;
        while(input.length > 0){
            let index = this.state.numerals.indexOf(input.substr(0,2));
            if(index === -1){
                val += this.state.numeralValue[this.state.numerals.indexOf(input.charAt(0))];
                //console.log("Matched 1 character", input, val);
                input = input.substr(1);
                //console.log("new input = ", input);
            }else{
                val += this.state.numeralValue[index];
                //console.log("Matched 2 character", input, val);
                input = input.substr(2);
                //console.log("new input = ", input);
            }
        }

        // console.log("[romanToInt] output = ", val);
        return val;
    }

    //converts integer to roman numerical equivalent (check number between 1 to 3999 and numerical input)
    intToRoman = val => {
        if (val > 3999 || val < 1 || !Number.isInteger(val)){
            return "Number can't be converted to Roman Format";
        }
        let res = "";

        while(val > 0){
            for(let i=0; i < this.state.numerals.length; i++){
                if(val >= this.state.numeralValue[i]){
                    res += this.state.numerals[i];
                    val -= this.state.numeralValue[i];
                    break;
                }
            }
        }
        return res;
    }

    //evaluates the entire input expression (supports only 2 )
    evalExpr = input => {
        //Checking if input expression is valid or not
        //If valid then get input1, operator and input2
        const regex = /(?<input1>[A-Z]+)(?<operator>[^A-Z])(?<input2>[A-Z]+)/;
        if(!regex.test(input)){
            return "Invalid input expression";
        }
        const inpRes = input.match(regex);
        const input1 = inpRes.groups.input1;
        const operator = inpRes.groups.operator;
        const input2 = inpRes.groups.input2;
        
        //Test if input1 and input2 are valid
        const res1 = this.testValidRoman(input1);
        const res2 = this.testValidRoman(input2);

        if(!res1){
            return "Invalid input1";
        }
        if(!res2){
            return "Invalid input2";
        }

        //If valid, then perform operation
        switch(operator){
            case '+': return this.romanToInt(input1) + this.romanToInt(input2); 
            case '-': return this.romanToInt(input1) - this.romanToInt(input2);
            case '*': return this.romanToInt(input1) * this.romanToInt(input2);
            default:
                return "Invalid operator";
        }
    }

    render() {
        return (
        <div className={classes.Calculator}>
            <div className={classes.Column}>
                <Input style={{width:'30%'}} input={this.state.expr} />
                <Input style={{width:'70%'}} input={this.state.input} />
            </div>
            <div className={classes.Column}>
                <div className={classes.Keys}>
                    <div className={classes.Row}>
                        <Button handleClick={this.handleValueInput}>CD</Button>
                        <Button handleClick={this.handleValueInput}>D</Button>
                        <Button handleClick={this.handleValueInput}>CM</Button>
                        <Button handleClick={this.handleValueInput}>M</Button>
                    </div>
                    <div className={classes.Row}>
                        <Button handleClick={this.handleValueInput}>XL</Button>
                        <Button handleClick={this.handleValueInput}>L</Button>
                        <Button handleClick={this.handleValueInput}>XC</Button>
                        <Button handleClick={this.handleValueInput}>C</Button>
                    </div>
                    <div className={classes.Row}>
                        <Button handleClick={this.handleValueInput}>IV</Button>
                        <Button handleClick={this.handleValueInput}>V</Button>
                        <Button handleClick={this.handleValueInput}>IX</Button>
                        <Button handleClick={this.handleValueInput}>X</Button>
                    </div>
                    <div className={classes.Row}>
                        <Button handleClick={this.handleValueInput}>I</Button>
                        <Button clearButton={true} handleClick={this.handleClear}>CLEAR</Button>
                        <Button 
                            backspace= {true}
                            style={{color: 'green'}} 
                            disabled = {this.state.input.length === 0}
                            handleClick={this.handleBackSpace}>&larr;</Button>
                    </div>
                </div>
                <div className={classes.Operators}>
                    <Button 
                        handleClick={this.handleOperatorInput}
                        disabled = {this.state.input.length === 0}>*</Button>
                    <Button 
                        handleClick={this.handleOperatorInput}
                        disabled = {this.state.input.length === 0}>-</Button>
                    <Button 
                        handleClick={this.handleOperatorInput}
                        disabled = {this.state.input.length === 0}>+</Button>
                    <Button 
                        handleClick={this.equalHandler}
                        disabled = {this.state.input.length === 0}>=</Button>
                </div>
            </div>
        </div>
        );
    }
}

export default Calculator;