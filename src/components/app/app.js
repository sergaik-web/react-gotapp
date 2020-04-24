import React, { Component } from "react";
import { Button, Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import CharPage from "../pages/charPage";
import BookPage from "../pages/bookPage";
import HousePage from "../pages/housePage";
import BooksItem from "../pages/booksItem";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./app.css";

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
      <Router>
        <div className={"app"}>
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
            <Route path={"/characters"} component={CharPage} />
            <Route path={"/houses"} component={HousePage} />
            <Route path={"/books"} exact component={BookPage} />
            <Route path={"/books/:id"} render={() => <BooksItem />} />
          </Container>
        </div>
      </Router>
    );
  }
}
