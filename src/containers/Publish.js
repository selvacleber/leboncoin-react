import React from "react";
import axios from "axios";

class Publish extends React.Component {
  state = {
    title: "",
    description: "",
    price: ""
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      [name]: value
    }); // evenement qui est de rentrer une valeur dans la case, target est dans quel case se passe l'evenement, name est la valeur rentrer
    //setstate (mettre a jour) la valeur rentrée, dans name de chaque input
  };
  onSubmit = event => {
    axios
      .post(
        "https://leboncoin-api.herokuapp.com/api/offer/publish",

        {
          title: this.state.title,
          description: this.state.description,
          price: this.state.price
        },
        { headers: { Authorization: `Bearer ${this.props.user.token}` } } // on transmet le token qui est dans le user, du coup props.user.token
      )
      .then(response => {
        if (response.data) {
          this.props.history.push("/");
        }
      })
      .catch(err => {
        // sinon on envoie une erreur
        console.log("l'annonce n'est pas passé");
      });
    event.preventDefault(); // ne pas ouvrir de nouvelle onglet/fenêtre lors de la connexion
  };

  render() {
    return (
      <div className="publish">
        <div className="annonce">
          <h3>Votre annonce</h3>
          <form onSubmit={this.onSubmit} className="form publish">
            <label htmlFor="title">Titre de l'annonnce</label>
            <input
              className="title"
              id="title"
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <label htmlFor="description">Description de l'annonce</label>
            <input
              className="description"
              id="description"
              name="description"
              type="texte"
              value={this.state.description}
              onChange={this.handleChange}
            />
            <label htmlFor="price">prix</label>
            <input
              className="price"
              id="price"
              name="price"
              type="texte"
              value={this.state.price}
              onChange={this.handleChange}
            />
            <input className="publishButton" type="submit" value="Valider" />
          </form>
        </div>
      </div>
    );
  }
}

export default Publish;
