import React from "react";

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

class Publish extends React.Component {
  render() {
    return;
    <form onSubmit={this.onSubmit} className="form form-publish">
      <input
        className="title"
        id="title"
        name="title"
        type="text"
        value={this.state.title}
        onChange={this.handleChange}
      />
      <input
        className="description"
        id="description"
        name="description"
        type="texte"
        value={this.state.description}
        onChange={this.handleChange}
      />
      <input
        className="price"
        id="price"
        name="price"
        type="number"
        value={this.state.password}
        onChange={this.handleChange}
      />
      <input className="publishButton" type="submit" value="Valider" />
    </form>;
  }
}

export default Publish;
