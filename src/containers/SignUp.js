import React from "react";
import axios from "axios";

class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    username: ""
  }; // etat qui est pour le moment vide

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      [name]: value
    }); // evenement qui est de rentrer une valeur dans la case, target est dans quel case se passe l'evenement, name est la valeur rentrer
    //setstate la valeur rentrée, dans name de chaque input
  };

  onSubmit = event => {
    axios
      .post("https://leboncoin-api.herokuapp.com/api/user/sign_up", {
        email: this.state.email,
        password: this.state.password,
        username: this.state.username
      }) // on recupere les datas rentrées par AXIOS
      .then(response => {
        // console.log(response.data);
        // {
        //   account: { username: "Farid" },
        //   token: "Ii0HYfXTN7L2SMoL",
        //   _id: "5b4ceb668c2a9a001440b2fb"
        // };

        if (response.data && response.data.token) {
          this.props.setUser({
            token: response.data.token,
            username: response.data.account.username,
            _id: response.data._id
          }); // si les data et token correspondent a ce qu'on a alors

          this.props.history.push("/"); // on va la page d'accueil
        }
      })
      .catch(err => {
        // sinon on envoie une erreur
        console.log(err);
      });
    event.preventDefault(); // ne pas ouvrir de nouvelle onglet/fenêtre lors de la connexion
  };

  render() {
    return (
      // 1) mise en place du formulaire
      <form onSubmit={this.onSubmit} className="form form-signup">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          value={this.state.email} // la valeur correspond a l'état déclaré au début
          onChange={this.handleChange} // afficher ce qui est écrit dans le formulaire
        />
        <label htmlFor="email">password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <label htmlFor="username">username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <input type="submit" value="Valider" />
      </form>
    ); // bouton valider a la fin du formulaire pour le soumettre
  }
}

export default SignUp;
