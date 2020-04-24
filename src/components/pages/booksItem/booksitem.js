import React, { Component } from "react";
import GodService from "../../../scripts/fetch";
import ItemDetails, { Field } from "../../itemDetails";

export default class BooksItem extends Component {
  gotService = new GodService();

  state = {
    selectedItem: 3,
  };

  render() {
    return (
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
  }
}
