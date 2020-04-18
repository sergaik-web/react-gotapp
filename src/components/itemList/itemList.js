import React, { Component } from "react";
import "./itemList.css";
import GodService from "../../scripts/fetch";
import Spiner from "../spiner";

export default class ItemList extends Component {
  godService = new GodService();

  state = {
    charList: null,
  };

  componentDidMount() {
    this.godService.getAllCharacters().then((charList) => {
      this.setState({ charList });
    });
  }

  renderItem(arr) {
    return arr.map((item) => {
      return (
        <li
          key={item.id}
          className="list-group-item"
          onClick={() => this.props.onCharSelected(item.id)}
        >
          {item.name}
        </li>
      );
    });
  }

  render() {
    const { charList } = this.state;

    if (!charList) {
      return <Spiner />;
    }

    const items = this.renderItem(charList);

    return <ul className="item-list list-group">{items}</ul>;
  }
}
