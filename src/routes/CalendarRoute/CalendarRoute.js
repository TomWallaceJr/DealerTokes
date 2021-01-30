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

  constructor(props) {
    super(props);
    this.state = {
      date: null,
      workdays: []
    }
  }


  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/workday/${this.context.user.id}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        this.context.setWorkdays(res);
        this.setState({
          workdays: res
        })
      })
  }

  // componentDidUpdate() {
  //   fetch(`${config.API_ENDPOINT}/workday/${this.context.user.id}`, {
  //     headers: {
  //       authorization: `bearer ${TokenService.getAuthToken()}`,
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       this.context.setWorkdays(res)
  //       this.setState({
  //         workdays: res
  //       })
  //     })
  // }

  populateWorkdays = () => {
    fetch(`${config.API_ENDPOINT}/workday/${this.context.user.id}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        this.context.setWorkdays(res);
        this.setState({
          workdays: res,
        })
      })
    console.log('context -', this.context.workdays)
    console.log('state -', this.state.workdays)
  }

  findTokesByDate = date => {

    console.log(this.state.workdays)
    let thisDay = (this.state.workdays).find(day => day.date === date);
    console.log(thisDay)
    return 'w'
  }

  onClick = date => this.setState({ date })
  // somehow get current dates Tokes value to display here
  // Use a .find method on this.context.workdays to find the workday with current date
  tileContent = ({ date, view }) => view === 'month' ? this.findTokesByDate(date) : null


  render() {
    return (
      <>
        <section className='cal'>
          <Calendar
            minDetail='year'
            onClickDay={this.onClick}
            tileContent={this.tileContent}
          />
        </section>
        <button type='button' onClick={this.populateWorkdays}>Get Data</button>
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
