import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class Header extends React.Component {
  onLogOut = event => {
    this.props.logOut();
    this.props.history.push("/");
    event.preventDefault();
  };
  renderNav() {
    if (this.props.user._id) {
      return (
        <React.Fragment>
          <li>
            <Link to="/">Offres</Link>
          </li>
          <li>
            <Link to="/publish">Deposer une annonce</Link>
          </li>
          <li>
            <NavLink to={"/profile/" + this.props.user._id}>
              {this.props.user.username}
            </NavLink>
          </li>
          <li>
            <button className="publishButton" onClick={this.onLogOut}>
              Déconnexion
            </button>
          </li>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <li>
          <NavLink to="/sign_up">Créer un compte</NavLink>
        </li>
        <li>
          <NavLink to="/log_in">Se connecter</NavLink>
        </li>
      </React.Fragment>
    );
  }
  render() {
    return (
      <header>
        <div className="lbc">
          <NavLink to="/">
            <img
              className="logo"
              src="https://static.leboncoin.fr/img/logo.svg"
              alt=""
            />
          </NavLink>
        </div>
        <div className="list">
          <ul className="nav-list">
            <li>
              <NavLink to="/" />
            </li>
            {this.renderNav()}
          </ul>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
