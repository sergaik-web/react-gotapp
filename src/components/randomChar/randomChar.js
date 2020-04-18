import React, { Component } from "react";
import "./randomChar.css";
import GodService from "../../scripts/fetch";
import Spiner from "../spiner";
import ErrorMessage from "../errorMess";

export default class RandomChar extends Component {
  componentDidMount() {
    this.updateChar();
    this.timerId = setInterval(this.updateChar, 1500);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  gotService = new GodService();

  state = {
    char: {},
    loading: true,
    error: false,
  };

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  updateChar = () => {
    console.log("update");
    const id = Math.floor(Math.random() * 400 + 25);
    this.gotService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  render() {
    const { char, loading, error } = this.state;

    const errMsg = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spiner /> : null;

    const content = !(loading || error) ? <View char={char} /> : null;

    return (
      <div className="random-block rounded">
        {errMsg}
        {spinner}
        {content}
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, gender, born, died, culture } = char;

  return (
    <>
      <h4>Random Character: {name}</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Gender </span>
          <span>{gender}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Born </span>
          <span>{born}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Died </span>
          <span>{died}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Culture </span>
          <span>{culture}</span>
        </li>
      </ul>
    </>
  );
};
