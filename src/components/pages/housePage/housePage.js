import React, { Component } from "react";
import ItemList from "../../itemList";
import CharDetails, { Field } from "../../charDetails";
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
            getData={this.gotService.getAllHouses}
            renderItem={({ name, region }) => `${name} (${region})`}
        />
    );

    const charDetails = (
        <CharDetails
            itemId={this.state.selectedItem}
            getData={this.gotService.getHouse}
            title={'Выберите, пожалуйста, дом из списка'}
        >
          <Field field={"region"} label={"Region"} />
          <Field field={"words"} label={"Words"} />
          <Field field={"titles"} label={"Titles"} />
          <Field field={"overlord"} label={"Overlord"} />
          <Field field={"ancestralWeapons"} label={"Ancestral Weapons"} />
        </CharDetails>
    );

    return <RowBlock left={itemList} right={charDetails} />;
  }
}
