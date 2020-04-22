import React, { Component } from "react";
import "./charDetails.css";
import GodService from "../../scripts/fetch";
import ErrorMessage from "../errorMess";

const Field = ({ char, field, label }) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="term">{label}</span>
      <span>{char[field]}</span>
    </li>
  );
};

export { Field };

export default class CharDetails extends Component {
  godSevice = new GodService();

  state = {
    char: null,
    error: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.charId !== this.props.charId) {
      this.godSevice.getCharacter(this.props.charId).then((char) => {
        this.setState({ char });
      });
    }
  }

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    if (this.state.char === null) {
      return (
        <span>
          <h2>Выберите персонажа фильма</h2>
        </span>
      );
    }

    const { char } = this.state;
    const { name } = char;

    return (
      <div className="char-details rounded">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, { char });
          })}
        </ul>
      </div>
    );
  }
}
