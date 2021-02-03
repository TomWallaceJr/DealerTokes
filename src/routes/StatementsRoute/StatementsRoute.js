import React, { Component } from "react";
import TokenService from "../../services/token-service";
import UserContext from "../../contexts/UserContext";
import config from "../../config";
import 'react-calendar/dist/Calendar.css';
import './StatementsRoute.css';
import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";


class DashRoute extends Component {
    static contextType = UserContext;

    state = {
        month: null,
        year: new Date().getFullYear()
    };

    componentDidMount() {
        //console.log('component mounting')
        fetch(`${config.API_ENDPOINT}/workday/${this.context.user.id}`, {
            headers: {
                authorization: `bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res => res.json())
            .then(res => this.context.setWorkdays(res))
    };


    getTotalTokes = () => {
        let totalTokes = 0
        this.context.workdays.forEach(workday => {
            console.log(workday)
            totalTokes += parseInt(workday.tokes)
        })
        return totalTokes
    };

    getTotalHours = () => {
        let totalHours = 0
        this.context.workdays.forEach(workday => {
            totalHours += parseFloat(workday.hours)
        })
        return totalHours
    };

    getTotalDowns = () => {
        let totalDowns = 0
        this.context.workdays.forEach(workday => {
            totalDowns += parseInt(workday.downs)
        })
        console.log(totalDowns)
        return totalDowns
    };

    getTokesPerHour = () => {
        return (this.getTotalTokes() / this.getTotalHours()).toFixed(2)
    };

    getTokesPerDown = () => {
        return (this.getTotalTokes() / this.getTotalDowns()).toFixed(2)
    };

    render() {
        // if (this.context.loading) return <p>Loading...</p>
        return (
            <>
                <table className='statement-summary'>
                    <thead><tr><td><h3>Your Summary To Date</h3></td></tr></thead>
                    <tbody>
                        <tr><td>Total Tokes:</td><td>${this.getTotalTokes()}</td></tr>
                        <tr><td>Tokes Per Hour:</td><td>${this.getTokesPerHour()}/hr</td></tr>
                        <tr><td>Tokes Per Down:</td><td>${this.getTokesPerDown()}/down</td></tr>
                    </tbody>
                </table>
                {/* <form className='statement-form' onSubmit={this.onSubmit}>
                    <label htmlFor='year'>Year:</label>
                    <select name='year' id='year'>
                        <option value='2020'>2020</option>
                        <option value='2021'>2021</option>
                    </select>
                    <label htmlFor='month'>Month:</label>
                    <select name='month' id='month'>
                        <option value='Jan'>Jan</option>
                        <option value='Feb'>Feb</option>
                        <option value='Mar'>Mar</option>
                        <option value='Apr'>Apr</option>
                        <option value='May'>May</option>
                        <option value='Jun'>Jun</option>
                        <option value='Jul'>Jul</option>
                        <option value='Aug'>Aug</option>
                        <option value='Sep'>Sep</option>
                        <option value='Oct'>Oct</option>
                        <option value='Nov'>Nov</option>
                        <option value='Dec'>Dec</option>
                    </select>
                    <button type='submit' >Get Monthly Statement</button>
                </form>
                <section>
                    {this.state.month ? <MonthlyStatement
                        month={this.state.month}
                        year={this.state.year} /> : null}
                </section> */}

                <h3 className='message'></h3>
                <BottomNavBar />
            </>
        );
    };
};

export default DashRoute;
