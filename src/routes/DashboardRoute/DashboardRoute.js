import React, { Component } from "react";
import TokenService from "../../services/token-service";
import UserContext from "../../contexts/UserContext";
import { Link } from 'react-router-dom';
import config from "../../config";



class DashboardRoute extends Component {
  static contextType = UserContext;

  async componentDidMount() {
    try {
      // instead of fetching language and words.... here we will fetch users workdays
      const response = await fetch(`${config.API_ENDPOINT}/language`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      });
      const res = await response.json();
      this.context.setLanguage(res.language.name);
      this.context.setWords(res.words);
      console.log(res.words)
      this.context.setTotalScore(res.language.total_score);
    } catch (error) {
      this.context.setError(error);
    }
  }

  render() {
    return (
      <section>
        <h1>TOPNAVBAR COMPONENT</h1>
        <h1>Welcome Back {this.context.user.name}!</h1>
        <h2>CALENDAR COMPONENT</h2>
        <h3>BOTTOMNAVBAR COMPONENT</h3>
      </section>
    );
  }
}

export default DashboardRoute;
