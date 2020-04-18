import React, { Component } from "react";
import { Button, Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ItemList from "../itemList";
import CharDetails from "../charDetails";

export default class App extends Component {
  state = {
    defaultChar: true,
    selectedChar: 130,
  };

  hideRandomChar = () => {
    this.setState({ defaultChar: !this.state.defaultChar });
  };

  onCharSelected = (id) => {
    this.setState({
      selectedChar: id,
    });
  };

  render() {
    const content = this.state.defaultChar ? <RandomChar /> : null;
    return (
      <>
        <Container>
          <Header />
        </Container>
        <Container>
          <Row>
            <Col lg={{ size: 5, offset: 0 }}>{content}</Col>
          </Row>
          <Row>
            <Col>
              <Button onClick={this.hideRandomChar}>
                Скрыть Random Character
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <ItemList onCharSelected={this.onCharSelected} />
            </Col>
            <Col md="6">
              <CharDetails charId={this.state.selectedChar} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
