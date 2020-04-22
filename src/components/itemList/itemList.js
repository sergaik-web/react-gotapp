import React, { Component } from "react";
import "./itemList.css";
import Spiner from "../spiner";
import ErrorMessage from "../errorMess";

export default class ItemList extends Component {
  state = {
    itemList: null,
    error: false,
  };

  componentDidMount() {
    const { getData } = this.props;

    getData().then((itemList) => {
      this.setState({ itemList });
    });
  }

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  renderItem(arr) {
    return arr.map((item) => {
      const { id } = item;
      const label = this.props.renderItem(item);
      return (
        <li
          key={id}
          className="list-group-item"
          onClick={() => this.props.onItemSelected(item.id)}
        >
          {label}
        </li>
      );
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    const { itemList } = this.state;

    if (!itemList) {
      return <Spiner />;
    }

    const items = this.renderItem(itemList);

    return <ul className="item-list list-group">{items}</ul>;
  }
}
