import React, { Component } from "react";
import TokenService from "../../services/token-service";
import WorkdayApiService from '../../services/workday-api-service';
import UserContext from "../../contexts/UserContext";
import config from "../../config";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DashRoute.css';
import DateDetails from "../../components/DateDetails/DateDetails";
import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";




class DashRoute extends Component {
  // constructor(props) {
  //   super(props);
  //   this.handleLoad = this.handleLoad.bind(this);
  // }
  static contextType = UserContext;

  state = {
    date: null,
    workdays: {}
  }

  // componentDidMount() {
  //   window.addEventListener('load', this.handleLoad);
  // }

  // componentDidUpdate() {
  //   window.addEventListener('load', this.handleLoad);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('load', this.handleLoad)
  // }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/workday/${this.context.user.id}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res => res.json())
      .then(res => this.context.setWorkdays(res))
      .then(res => console.log('component did mount -', this.context))
  }




  findTokesByDate = date => {

    let formattedDate = date.toISOString().split('T')[0]
    //console.log('context user -', this.context.user)
    //console.log('context workdays -', this.context.workdays)
    return 'y'
    // this.context.workdays.find(workday => {
    //   if (workday.date === formattedDate)
    //     return workday.tokes
    // })
  }

  onClickDay = date => this.setState({ date })
  // somehow get current dates Tokes value to display here
  // Use a .find method on this.context.workdays to find the workday with current date
  tileContent = ({ date, view }) => {
    // this console log context here shows this.context.users populated but this.context.workdays is not
    console.log('tile content -', this.context)
    if (view === 'month') {
      this.findTokesByDate(date)
    } else {
      return null
    }
  }


  render() {
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
  }
}

export default DashRoute;
