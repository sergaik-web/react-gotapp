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
        getData={this.gotService.getAllCharacters}
        renderItem={({ name, gender }) => `${name} (${gender})`}
      />
    );

    const charDetails = (
      <ItemDetails
        itemId={this.state.selectedItem}
        getData={this.gotService.getCharacter}
        title={"Выберите, пожалуйста, персонажа из списка"}
      >
        <Field field={"gender"} label={"Gender"} />
        <Field field={"born"} label={"Born"} />
        <Field field={"died"} label={"Died"} />
        <Field field={"culture"} label={"Culture"} />
      </ItemDetails>
    );

    return <RowBlock left={itemList} right={charDetails} />;
  }
}
