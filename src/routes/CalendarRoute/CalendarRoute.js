import React, { Component } from "react";
import TokenService from "../../services/token-service";
import UserContext from "../../contexts/UserContext";
import config from "../../config";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarRoute.css';
import DateDetails from "../../components/DateDetails/DateDetails";




class DashboardRoute extends Component {
  static contextType = UserContext;

  state = {
    date: null
  }

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

  onChange = date => this.setState({ date })
  onClickDay = date => this.setState({ date })

  render() {
    return (
      <section className='remove-styles'>
        <Calendar
          minDetail='year'
          onChange={this.onChange}
          onClick={this.onClickDay}
        />
        {this.state.date ? <DateDetails
          date={this.state.date}
        /> : null}
      </section>
    );
  }
}

export default DashboardRoute;
