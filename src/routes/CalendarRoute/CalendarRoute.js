import React, { Component } from "react";
import TokenService from "../../services/token-service";
import WorkdayApiService from '../../services/workday-api-service';
import UserContext from "../../contexts/UserContext";
import config from "../../config";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarRoute.css';
import DateDetails from "../../components/DateDetails/DateDetails";
import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";




class CalendarRoute extends Component {
  constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
  }
  static contextType = UserContext;

  state = {
    date: null,
  }

  componentDidMount() {
    window.addEventListener('load', this.handleLoad);
  }

  componentDidUpdate() {
    window.addEventListener('load', this.handleLoad);
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.handleLoad)
  }

  handleLoad() {
    fetch(`${config.API_ENDPOINT}/workday/${this.context.user.id}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res => res.json())
      .then(res => this.context.setWorkdays(res))
  }

  handleLogoutClick = () => {
    this.context.processLogout()
  }



  findTokesByDate = date => {
    let formattedDate = date.toISOString().split('T')[0]
    console.log('context user -', this.context.user)
    console.log('context workdays -', this.context.workdays)
    //this.context.workdays.find(workday => workday.date === formattedDate)
  }

  onClick = date => this.setState({ date })
  // somehow get current dates Tokes value to display here
  // Use a .find method on this.context.workdays to find the workday with current date
  tileContent = ({ date, view }) => view === 'month' ? this.findTokesByDate(date) : null


  render() {
    return (
      <>
        <section className='cal-container'>
          <Calendar
            minDetail='year'
            onClickDay={this.onClick}
            tileContent={this.tileContent}
            className='cal'
          />
        </section>
        {/* <button type='button' onClick={this.populateWorkdays}>Get Data</button> */}
        <section>
          {this.state.date ? <DateDetails
            date={this.state.date}
            onChange={this.onChange}
          /> : null}
          <BottomNavBar />
        </section>
      </>
    );
  }
}

//CalendarRoute.contextType = UserContext

export default CalendarRoute;
