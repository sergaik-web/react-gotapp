import React, { Component } from "react";
import "./charDetails.css";
import GodService from "../../scripts/fetch";

export default class CharDetails extends Component {
  godSevice = new GodService();

  state = {
    char: null,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.charId !== this.props.charId) {
      this.godSevice.getCharacter(this.props.charId).then((char) => {
        this.setState({ char });
      });
    }
  }

  render() {
    if (this.state.char === null) {
      return (
        <span>
          <h2>Выберите персонажа фильма</h2>
        </span>
      );
    }

    const { name, gender, born, died, culture } = this.state.char;

    return (
      <div className="char-details rounded">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Born</span>
            <span>{born}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Died</span>
            <span>{died}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Culture</span>
            <span>{culture}</span>
          </li>
        </ul>
      </div>
    );
  }
}
