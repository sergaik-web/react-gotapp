import React, { Component } from "react";
import ItemList from "../../itemList";
import ItemDetails, { Field } from "../../itemDetails";
import ErrorMessage from "../../errorMess";
import GodService from "../../../scripts/fetch";
import RowBlock from "../../rowBlock";

export default class CharPage extends Component {
  gotService = new GodService();
  state = {
    selectedItem: null,
    error: false,
  };

  onItemSelected = (id) => {
    this.setState({
      selectedItem: id,
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
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllBooks}
        renderItem={({ name, numberOfPages }) =>
          `${name} (Pages: ${numberOfPages})`
        }
      />
    );

    const charDetails = (
      <ItemDetails
        itemId={this.state.selectedItem}
        getData={this.gotService.getBook}
        title={"Выберите, пожалуйста, книгу из списка"}
      >
        <Field field={"numberOfPages"} label={"Pages"} />
        <Field field={"publisher"} label={"Publisher"} />
        <Field field={"released"} label={"Released"} />
      </ItemDetails>
    );

    return <RowBlock left={itemList} right={charDetails} />;
  }
}
