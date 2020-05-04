import React, { Component } from "react";
import "./itemList.css";
import Spiner from "../spiner";
import ErrorMessage from "../errorMess";

class ItemList extends Component {
  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  static defaultProps = {
    onItemSelected: () => {},
  };

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
    const { data } = this.props;
    const items = this.renderItem(data);

    return <ul className="item-list list-group">{items}</ul>;
  }
}

const withData = (View) => {
  return class extends Component {
    state = {
      data: null,
      error: false,
    };

    componentDidMount() {
      const { getData } = this.props;

      getData().then((data) => {
        this.setState({ data });
      });
    }

    render() {
      if (this.state.error) {
        return <ErrorMessage />;
      }

      const { data } = this.state;

      if (!data) {
        return <Spiner />;
      }

      return <View {...this.props} data={data} />;
    }
  };
};

export default withData(ItemList);
