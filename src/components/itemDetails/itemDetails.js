import React, { Component } from "react";
import "./itemDetails.css";
import ErrorMessage from "../errorMess";
import Spiner from "../spiner";

const Field = ({ item, field, label }) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export { Field };

export default class ItemDetails extends Component {
  state = {
    item: null,
    error: false,
  };

  componentDidUpdate(prevProps) {
    const { getData } = this.props;
    if (prevProps.itemId !== this.props.itemId) {
      getData(this.props.itemId).then((item) => {
        this.setState({ item });
      });
    }
  }

  componentDidMount() {
    const { getData } = this.props;
    if (this.props.itemId) {
      getData(this.props.itemId).then((item) => {
        this.setState({ item });
      });
    }
  }

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  render() {
    const { title } = this.props;
    if (this.state.error) {
      return <ErrorMessage />;
    }

    if (this.state.item === null) {
      if (!title) {
        return <Spiner />;
      } else
        return (
          <span>
            <h2>{title}</h2>
          </span>
        );
    }

    const { item } = this.state;
    const { name } = item;

    return (
      <div className="char-details rounded">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, { item });
          })}
        </ul>
      </div>
    );
  }
}
