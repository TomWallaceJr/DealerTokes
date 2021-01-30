import React, { Component } from "react";
import TokenService from "../../services/token-service";
import WorkdayApiService from '../../services/workday-api-service';
import UserContext from "../../contexts/UserContext";
import config from "../../config";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarRoute.css';
import DateDetails from "../../components/DateDetails/DateDetails";



class CalendarRoute extends Component {
  static contextType = UserContext;

  state = {
    date: null
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/workday/${this.context.user.id}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res => res.json())
      .then(res => this.context.setWorkdays(res))
  }

  findTokesByDate = date => {

    console.log(this.context)
    // let thisDay = this.context.workdays.find(day => day.date === date);
    // let tokes = thisDay.tokes;
    // return tokes
  }

  onChange = date => this.setState({ date })
  // somehow get current dates Tokes value to display here
  // Use a .find method on this.context.workdays to find the workday with current date
  tileContent = ({ date, view }) => view === 'month' ? this.findTokesByDate(date) : null


  render() {
    return (
      <>
        <section className='cal'>
          <Calendar
            minDetail='year'
            onChange={this.onChange}
            tileContent={this.tileContent}
          />
        </section>
        <section>
          {this.state.date ? <DateDetails
            date={this.state.date}
            onChange={this.onChange}
          /> : null}
        </section>
      </>
    );
  }
}

//CalendarRoute.contextType = UserContext

export default CalendarRoute;
