import React, { Component } from "react";
import TokenService from "../../services/token-service";
import UserContext from "../../contexts/UserContext";
import config from "../../config";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DashRoute.css';
import DateDetails from "../../components/DateDetails/DateDetails";
import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";




class DashRoute extends Component {
  static contextType = UserContext;

  state = {
    date: null,
  };

  componentDidMount() {
    console.log('component mounting')
    fetch(`${config.API_ENDPOINT}/workday/${this.context.user.id}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res => res.json())
      .then(res => this.context.setWorkdays(res))
      .then(res => this.context.setLoading())
    // .then(res => this.context.setLoading())
  }

  componentWillUnmount() {
    this.context.setLoading()
  }

  // returns current days tokes
  findTokesByDate = date => {
    let daysTokes = null;
    let formattedDate = date.toISOString().split('T')[0]
    this.context.workdays.find(workday => {
      if (workday.date.split('T')[0] === formattedDate) {
        daysTokes = workday.tokes
      }
    })
    if (daysTokes)
      return <p>${daysTokes}</p>
  }

  onClickDay = date => this.setState({ date })

  // titleContent is called for each day on calendar
  tileContent = ({ date, view }) => view === 'month' && this.findTokesByDate(date)



  render() {
    console.log(this.context.loading)
    if (this.context.loading) return <p>Loading...</p>
    return (
      <>
        <section className='cal-container'>
          <Calendar
            minDetail='year'
            onClickDay={this.onClickDay}
            tileContent={this.tileContent}
            className='cal'
          />
        </section>
        <section>
          {this.state.date ? <DateDetails
            date={this.state.date}
            onChange={this.onChange}
          /> : null}
        </section>
        <BottomNavBar />
      </>
    );
  };
};

export default DashRoute;
