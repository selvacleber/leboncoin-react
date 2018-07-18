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
    //setstate (mettre a jour) la valeur rentrée, dans name de chaque input
  };

  onSubmit = event => {
    axios
      .post("https://leboncoin-api.herokuapp.com/api/user/sign_up", {
        //pour s'inscrire on rentre le mail, pwd et name
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
          }); //

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
      <div className="sign">
        <div className="whyAccount">
          <h3>Pourquoi créer un compte?</h3>
          <ul>
            <li>
              <h4>Gagner du temps</h4>
              <div className="why">
                <img
                  className="icon"
                  src="data:image/jpeg;base64,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"
                  alt=""
                />

                <div className="texte">
                  Publiez vos annonces rapidement, avec vos informations
                  pré-remplies chaque fois que vous souhaitez deposer une
                  nouvelle annonce
                </div>
              </div>
            </li>
            <li>
              <h4>Soyez les premiers informés</h4>
              <div className="why">
                <img
                  className="icon"
                  src="data:image/png;base64,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"
                  alt=""
                />
                <div className="texte">
                  Créer des alertes Immo ou Emploi et ne manquez jamais
                  l'annonce qui vous intéresse.
                </div>
              </div>
            </li>
            <li>
              <h4>Visibilité</h4>
              <div className="why">
                <img
                  className="eye"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiwbsvhQ5UcYkr5K-fDtgT9quK8oFWa7fJQFB5LWtQCPnfnQa4UQ"
                  alt=""
                />
                <div className="texte">
                  Suivi les statistiques de vos annonces (nombre de fois où
                  votre annonce a été vue, nombre de contacts recus).
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="myAccount">
          <form onSubmit={this.onSubmit} className="form form-signup">
            <h3>Créez un compte</h3>
            <label htmlFor="username">Pseudo</label>
            <input
              className="name"
              id="username"
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <label htmlFor="email">Email</label>
            <input
              className="email"
              id="email"
              name="email"
              type="text"
              value={this.state.email} // la valeur correspond a l'état déclaré au début
              onChange={this.handleChange} // afficher ce qui est écrit dans le formulaire
            />
            <div className="mdp">
              <label htmlFor="email">Mot de passe </label>
              <input
                className="pwd"
                id="password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <label htmlFor="email">Confirmer le mot de passe </label>
              <input
                className="pwd"
                id="password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>

            <input
              className="createButton"
              type="submit"
              value="Creer mon compte personnel"
            />
          </form>
        </div>
      </div>
    ); // bouton valider a la fin du formulaire pour le soumettre
  }
}

export default SignUp;
