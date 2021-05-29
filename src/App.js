import React, { Component } from 'react'
import blinkCursor from './utils/blinkCursor';
import { BUTTONS, NUMBER_CASE, NON_ALPHABETS } from './utils/constants';
import { shuffle } from './utils/shuffle';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: BUTTONS,
      userInput: "",
      shiftKey: false,
      caps: false
    };
    this.numberCase = NUMBER_CASE;
  }

  componentDidMount() {
    blinkCursor();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.shiftKey !== this.state.shiftKey) {
      let keys = this.state.buttons;
      keys = keys.map(el => {
        if(!NON_ALPHABETS.includes(el)) {
          if(this.state.caps)
            return el;
          if(this.state.shiftKey)
            return el.toUpperCase();
          else
            return el.toLowerCase();
        }
        else {
          if(this.state.shiftKey)
            return this.numberCase[el];
          else 
            return Object.keys(this.numberCase).find(key => this.numberCase[key] === el);            
        }
      });
      this.setState({buttons: keys})
    }
  }

  keyPressed = (el) => {
    switch(el) {
      case "caps":
        if(this.state.caps)
          document.getElementById('caps').style.color="#333";
        else
          document.getElementById('caps').style.color="green";
        let keys = this.state.buttons;
        if(this.state.shiftKey) {
          this.setState({caps: !this.state.caps})
          return;
        }
        keys = keys.map(el => {
          if(!NON_ALPHABETS.includes(el))
            if(!this.state.caps)
              return el.toUpperCase();
            else
              return el.toLowerCase();
          else {
            return el;
          }
        });
        this.setState({caps: !this.state.caps, buttons: keys})
        break;
      case "shift":
        this.setState({shiftKey: !this.state.shiftKey})
        break;
      case "delete": 
        let input = this.state.userInput;
        input = input.slice(0,-1);
        this.setState({userInput: input})
        break;
      case "space":
        this.setState({userInput: this.state.userInput + ' '});
        break;
      case "enter":
        this.setState({userInput: this.state.userInput + '\n'});
        break
      default:
        this.setState({userInput: this.state.userInput + el, buttons: shuffle(this.state.buttons), shiftKey: false})
    } 
  }

  renderButtons = () => {
    const Keyboard = [];
    this.state.buttons.forEach(el => {
        Keyboard.push(<button className = "single-key" key = {el} onClick = {() => this.keyPressed(el)}>{el}</button>);
    });
    Keyboard.splice(8,0,<button className = "single-key big-key" key = "delete" onClick = {() => this.keyPressed("delete")}>delete</button>)
    Keyboard.splice(19,0,<button id = "caps" className = "single-key big-key" key = "caps" onClick = {() => this.keyPressed("caps")}>caps</button>)
    Keyboard.splice(26,0,<button className = "single-key big-key" key = "enter" onClick = {() => this.keyPressed("enter")}>enter</button>)
    Keyboard.splice(27,0,<button className = "single-key big-key" key = "shift" onClick = {() => this.keyPressed("shift")}>shift</button>)
    Keyboard.splice(40,0,<button className = "single-key big-key" key = "space" onClick = {() => this.keyPressed("space")}>space</button>)
    
    return <div className = "keyboard-layout">{Keyboard}</div>;
  }

  render() {
    return (
      <div className = "container">
          <div className = "user-input">{this.state.userInput}<span id="cursor">|</span></div>
          {this.renderButtons()}
      </div>
    )
  }
}