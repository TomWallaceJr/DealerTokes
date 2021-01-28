import React, { Component } from "react";
import TokenService from "../../services/token-service";
import UserContext from "../../contexts/UserContext";
import { Link } from 'react-router-dom';
import config from "../../config";
import Calendar from "../../components/Calendar/Calendar";



class DashboardRoute extends Component {
  static contextType = UserContext;

  async componentDidMount() {
    try {
      const response = await fetch(`${config.API_ENDPOINT}/workday/${this.context.user.id}`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      });
      const res = await response.json();
      //console.log(res)
      this.context.setWorkdays(res);
    } catch (error) {
      this.context.setError(error);
    }
  }

  render() {
    return (
      <section>
        <Calendar />
        <h3>BOTTOMNAVBAR COMPONENT</h3>
      </section>
    );
  }
}

export default DashboardRoute;
