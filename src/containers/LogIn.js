import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class LogIn extends React.Component {
  state = {
    email: "",
    password: ""
  };

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
      .post("https://leboncoin-api.herokuapp.com/api/user/log_in", {
        email: this.state.email,
        password: this.state.password
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
      <div className="logIn">
        <div className="log">
          <form onSubmit={this.onSubmit} className="form form-signup">
            <h3>Connexion</h3>
            <label htmllog="email">Email</label>
            <input
              className="email"
              id="email"
              name="email"
              type="text"
              value={this.state.email} // la valeur correspond a l'état déclaré au début
              onChange={this.handleChange} // afficher ce qui est écrit dans le formulaire
            />
            <label htmllog="email">password</label>
            <input
              className="pwdlog"
              id="password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <input className="createButton" type="submit" value="Valider" />

            <label htmllog="email">Vous n'avez pas de compte</label>
            <Link to="/sign_up">
              <input
                className="linkButton"
                type="submit"
                value="Creer un compte"
              />
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default LogIn;
