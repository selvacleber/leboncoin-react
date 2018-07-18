import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Home extends React.Component {
  state = {
    offer: []
  };

  render() {
    console.log("render");
    const lastoffers = [];

    for (let i = 0; i < this.state.offer.length; i++) {
      lastoffers.push(
        <ul>
          <li key={i}>
            <Link to={"/offer/" + this.state.offer[i]._id}>
              <img
                className="gris"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEXAwMBmS75kAAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC"
                alt=""
              />
              <div>{this.state.offer[i].title}</div>
              <div>{this.state.offer[i].price} €</div>
            </Link>
          </li>
        </ul>
      );
    }
    return (
      <React.Fragment>
        <h2>Liste des annonces</h2>

        <ul className="listoffers">
          <li>{lastoffers}</li>
        </ul>
      </React.Fragment>
    );
  }
  componentDidMount() {
    console.log("componentDidMount");
    axios
      .get("https://leboncoin-api.herokuapp.com/api/offer")
      .then(response => {
        // En appelant setState, deux choses se passent :
        // 1. Modification de l'état
        // 2. La méthode render est appelé de nouveau
        this.setState({
          offer: response.data
        });
      });
  }
}

export default Home;
