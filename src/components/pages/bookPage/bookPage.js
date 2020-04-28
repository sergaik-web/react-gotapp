import React, { Component } from "react";
import ItemList from "../../itemList";
import ErrorMessage from "../../errorMess";
import GodService from "../../../scripts/fetch";
import { withRouter } from "react-router-dom";

class BookPage extends Component {
  gotService = new GodService();
  state = {
    error: false,
  };

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    return (
      <ItemList
        onItemSelected={(itemId) => {
          console.log(itemId);
          this.props.history.push(`${itemId}`);
        }}
        getData={this.gotService.getAllBooks}
        renderItem={({ name, numberOfPages }) =>
          `${name} (Pages: ${numberOfPages})`
        }
      />
    );
  }
}

export default withRouter(BookPage);
