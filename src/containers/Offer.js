import React from "react";
import axios from "axios";

class Offer extends React.Component {
  state = { item: [] };

  render() {
    console.log("render");

    return (
      <React.Fragment>
        <h2>{this.state.item.title}</h2>
        <ul>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEXAwMBmS75kAAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC"
            alt=""
          />
          <li>{this.state.item.title}</li>
          <li>{this.state.item.description}</li>
          <li>{this.state.item.price}€</li>
          <li>{this.props.user.username}</li>
        </ul>
      </React.Fragment>
    );
  }
  componentDidMount() {
    console.log("componentDidMount");
    axios
      .get(
        "https://leboncoin-api.herokuapp.com/api/offer/" +
          this.props.match.params.id
      )
      .then(response => {
        /* app.get("/api/room/:id", function(req, res) {
          rooms.findOne({ _id: req.params.id }).exec(function(err, rooms) {
            if (err) {
              return res.status(400).json({ message: "don't find id" });
            }
            if (obj === null) {
              res.status(404).json({ error: "don't find id" });
            } else {
              res.json(rooms);
            }
          });
        });*/
        this.setState({
          item: response.data
        });
      });
  }
}

export default Offer;
