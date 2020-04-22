import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import ItemList from "../itemList";
import CharDetails from "../charDetails";
import ErrorMessage from "../errorMess";
import GodService from "../../scripts/fetch";

export default class BookPage extends Component {
  gotService = new GodService();
  state = {
    selectedChar: 130,
    error: false,
  };

  onItemSelected = (id) => {
    this.setState({
      selectedChar: id,
    });
  };

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    } else {
      return (
        <Row>
          <Col md="6">
            <ItemList
              onItemSelected={this.onItemSelected}
              getData={this.gotService.getAllBooks}
              renderItem={(item) => `${item.name}`}
            />
          </Col>
          <Col md="6">
            <CharDetails charId={this.state.selectedChar} />
          </Col>
        </Row>
      );
    }
  }
}
