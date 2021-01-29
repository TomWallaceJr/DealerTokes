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

    static contextType = UserContext
    state = { error: null }


    handleSubmit = e => {
        e.preventDefault();
        console.log(this.context.user.id)
        // get correct date format
        // function getCurrentDateTimeMySql() {
        //     var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        //     var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19).replace('T', ' ');
        //     var mySqlDT = localISOTime;
        //     return mySqlDT;
        // }
        // let date = getCurrentDateTimeMySql()

        const { date, hours, downs, tokes, notes } = e.target;
        WorkdayApiService.postNewWorkday({
            date: this.props.date,
            hours: hours.value,
            downs: downs.value,
            tokes: tokes.value,
            notes: notes.value,
            user_id: this.context.user.id
        })
            .then(workday => {
                console.log('inside .then')
                date.value = ''
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

    render() {
        const { error } = this.state
        return (
            <form
                className='new-workday-form'
                onSubmit={this.handleSubmit}
            >
                {/* <div role='alert'>
                    {error && <p>{error}</p>}
                </div> */}
                <div>
                    <Label htmlFor='date-input'>Date</Label>
                    <Input
                        defaultValue={this.props.date}
                        readOnly
                        id='date'
                        name='date'
                        required
                    />
                </div>
                <div>
                    <Label htmlFor='hours'>Hours Worked</Label>
                    <Input
                        id='hours'
                        name='hours'
                        required
                    />
                </div>
                <div>
                    <Label htmlFor='downs'>Downs Dealt</Label>
                    <Input
                        id='downs'
                        name='downs'
                        required
                    />
                </div>
                <div>
                    <Label htmlFor='tokes'>Tokes Earned</Label>
                    <Input
                        id='tokes'
                        name='tokes'
                        required
                    />
                </div>
                <div>
                    <Label htmlFor='notes'>Notes</Label>
                    <Textarea
                        id='notes'
                        name='notes'
                    />
                </div>
                <Button type='submit'>Add New Workday</Button>
            </form>
        )
    }
}
