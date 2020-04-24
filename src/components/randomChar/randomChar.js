import React, { Component } from "react";
import "./randomChar.css";
import GodService from "../../scripts/fetch";
import ErrorMessage from "../errorMess";
import ItemDetails, { Field } from "../itemDetails";

export default class RandomChar extends Component {
  gotService = new GodService();

  state = {
    selectedItem: 130,
    error: false,
  };

  updateChar = () => {
    const id = Math.floor(Math.random() * 400 + 25);
    this.setState({
      selectedItem: id,
    });
  };

  componentDidMount() {
    this.updateChar();
    this.timerId = setInterval(this.updateChar, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  render() {
    const charDetails = (
      <ItemDetails
        itemId={this.state.selectedItem}
        getData={this.gotService.getCharacter}
      >
        <Field field={"gender"} label={"Gender"} />
        <Field field={"born"} label={"Born"} />
        <Field field={"died"} label={"Died"} />
        <Field field={"culture"} label={"Culture"} />
      </ItemDetails>
    );

    const { error } = this.state;
    const errMsg = error ? <ErrorMessage /> : null;
    const content = !error ? charDetails : null;

    return (
      <div className="random-block rounded">
        {errMsg}
        {content}
      </div>
    );
  }
}
