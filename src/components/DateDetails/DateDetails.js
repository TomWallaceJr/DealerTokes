import React, { Component } from 'react'
import { Input, Label, Textarea } from '../Form/Form'
import Button from '../Button/Button'
import UserContext from '../../contexts/UserContext'

export default class DateDetails extends Component {
    // maybe default props here
    // static defaultProps = {
    // newWorkdaySubmitSuccess: () => { }
    // }

    static contextType = UserContext
    state = { error: null }

    handleSubmit = e => {
        // code when form submitted
        console.log('OK')
    }

    render() {
        const { error } = this.state
        return (
            <form
                className='new-workday-form'
                onSubmit={this.handleSubmit}
            >
                <div role='alert'>
                    {error && <p>{error}</p>}
                </div>
                <div>
                    <Label htmlFor='date-input'>Date</Label>
                    <Input
                        value={this.props.date}
                        id='date-input'
                        name='date-input'
                        required
                    />
                </div>
                <div>
                    <Label htmlFor='hours-input'>Hours Worked</Label>
                    <Input
                        id='hours-input'
                        name='hours-input'
                        required
                    />
                </div>
                <div>
                    <Label htmlFor='downs-input'>Downs Dealt</Label>
                    <Input
                        id='downs-input'
                        name='downs-input'
                        required
                    />
                </div>
                <div>
                    <Label htmlFor='tokes-input'>Tokes Earned</Label>
                    <Input
                        id='tokes-input'
                        name='tokes-input'
                        required
                    />
                </div>
                <div>
                    <Label htmlFor='notes-input'>Notes</Label>
                    <Textarea
                        id='notes-input'
                        name='notes-input'
                    />
                </div>
                <Button type='submit'>Add New Workday</Button>
            </form>
        )
    }
}
