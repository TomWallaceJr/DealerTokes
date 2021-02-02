import React, { Component } from 'react'
import { Input, Label, Textarea } from '../Form/Form'
import Button from '../Button/Button'
import UserContext from '../../contexts/UserContext'
import WorkdayApiService from '../../services/workday-api-service'

export default class DateDetails extends Component {
    static defaultProps = {
        newWorkdaySubmitSuccess: () => { }
    }

    state = { error: null }
    static contextType = UserContext

    handleSubmit = e => {
        e.preventDefault();

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
        //this.props.history.push('/')
    }

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
                    <Label htmlFor='date-input'>Date:</Label>

                    <Input
                        value={this.props.date}
                        onChange={this.props.onChange}
                        readOnly
                        id='date-input'
                        name='date'
                        required
                    />
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
