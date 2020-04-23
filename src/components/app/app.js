import React, { Component } from "react";
import { Button, Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import CharPage from "../pages/charPage";
import BookPage from "../pages/bookPage";
import HousePage from "../pages/housePage";

export default class App extends Component {
  state = {
    defaultChar: true,
    selectedChar: 130,
  };

  hideRandomChar = () => {
    this.setState({ defaultChar: !this.state.defaultChar });
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
          <CharPage />
          <BookPage />
          <HousePage />
        </Container>
      </>
    );
  }
}
