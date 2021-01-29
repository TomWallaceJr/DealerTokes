import React, { Component } from 'react'
import { Input, Label, Textarea } from '../Form/Form'
import Button from '../Button/Button'
import UserContext from '../../contexts/UserContext'
import WorkdayApiService from '../../services/workday-api-service'

export default class DateDetails extends Component {
    // maybe default props here
    static defaultProps = {
        newWorkdaySubmitSuccess: () => { }
    }

    state = { error: null }
    static contextType = UserContext


    // I Cant get this POST request accepted. Keep gettin 400 bad Request
    // {"error":{"message":"Missing hours in request body"}}
    // I tried setting all values in state onchange as well as just deconstructing
    // values 
    // BUT SENDING SAME VALUES WORK IN POSTMAN !!! SO IT CANT BE ON SERVER SIDE HAS TO BE HERE!
    handleSubmit = e => {
        e.preventDefault();
        // these are fine
        console.log(e.target.hours.value)
        console.log(e.target.downs.value)
        console.log(e.target.tokes.value)
        console.log(e.target.notes.value)
        const { hours, downs, tokes, notes } = e.target;
        const newWorkday = {
            date: this.props.date,
            hours: hours.value,
            downs: downs.value,
            tokes: tokes.value,
            notes: notes.value,
            user_id: this.context.user.id
        }
        WorkdayApiService.postNewWorkday(newWorkday)
            .then(workday => {
                console.log('inside .then workday - ', workday)
                hours.value = ''
                downs.value = ''
                tokes.value = ''
                notes.value = ''
                this.props.newWorkdaySubmitSuccess()
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    // these funcs were just when tried to use state values to send in PoST request
    // keeping in case i try again
    // handleHoursChange = e => {
    //     e.preventDefault();
    //     this.setState({ hours: e.currentTarget.value })
    // }

    // handleDownsChange = e => {
    //     e.preventDefault();
    //     this.setState({ downs: e.currentTarget.value })
    // }

    // handleTokesChange = e => {
    //     e.preventDefault();
    //     this.setState({ tokes: e.currentTarget.value })
    // }

    // handleNotesChange = e => {
    //     e.preventDefault();
    //     this.setState({ notes: e.currentTarget.value })
    // }

    render() {
        //const { error } = this.state
        return (
            <form
                className='new-workday-form'
                onSubmit={this.handleSubmit}
            >
                {/* <div role='alert'>
                    {error && <p>{error}</p>}
                </div> */}
                <div>
                    <Label htmlFor='date-input'>Date: {this.props.date.date}</Label>

                    {/* <Input
                        defaultValue={this.props.date}
                        readOnly
                        id='date-input'
                        name='date'
                        required
                    /> */}
                </div>
                <div>
                    <Label htmlFor='hours-input'>Hours Worked</Label>
                    <Input
                        id='hours-input'
                        name='hours'
                        required
                    />
                </div>
                <div>
                    <Label htmlFor='downs-input'>Downs Dealt</Label>
                    <Input
                        id='downs-input'
                        name='downs'
                        required
                    />
                </div>
                <div>
                    <Label htmlFor='tokes-input'>Tokes Earned</Label>
                    <Input
                        id='tokes-input'
                        name='tokes'
                        required
                    />
                </div>
                <div>
                    <Label htmlFor='notes-input'>Notes</Label>
                    <Textarea
                        id='notes-input'
                        name='notes'
                    />
                </div>
                <Button type='submit'>Add New Workday</Button>
            </form>
        )
    }
}
