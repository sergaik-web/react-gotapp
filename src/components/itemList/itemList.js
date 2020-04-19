import React, { Component } from "react";
import "./itemList.css";
import GodService from "../../scripts/fetch";
import Spiner from "../spiner";
import ErrorMessage from "../errorMess";

export default class ItemList extends Component {
  godService = new GodService();

  state = {
    charList: null,
    error: false,
  };

  componentDidMount() {
    this.godService.getAllCharacters().then((charList) => {
      this.setState({ charList });
    });
  }

  componentDidCatch() {
    this.setState({
      error: true,
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
    if (this.state.error) {
      return <ErrorMessage />;
    }

    const { charList } = this.state;

    if (!charList) {
      return <Spiner />;
    }

    const items = this.renderItem(charList);

    return <ul className="item-list list-group">{items}</ul>;
  }
}
