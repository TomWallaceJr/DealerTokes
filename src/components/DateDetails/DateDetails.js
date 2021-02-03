import React, { Component } from 'react';
import { Input, Label, Textarea } from '../Form/Form';
import Button from '../Button/Button';
import UserContext from '../../contexts/UserContext';
import WorkdayApiService from '../../services/workday-api-service';
import './DateDetails.css';

export default class DateDetails extends Component {
    state = {
        error: null,
    };
    static contextType = UserContext;

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
        };
        WorkdayApiService.postNewWorkday(newWorkday)
            .catch(res => {
                this.setState({ error: res.error })
            })
        window.location.reload();
    };

    handleDelete() {
        console.log('delete')
        //console.log(this.context)
        //console.log(this.props.date)
        // WorkdayApiService.deleteWorkday(user_id, date)
        window.location.reload();
    }

    dataEntered(date) {
        let formattedDate = date.toISOString().split('T')[0]
        return this.context.workdays.find(workday => {
            if (workday.date.split('T')[0] === formattedDate) {
                return true
            }
        });
    };

    getDaysData(date) {
        let formattedDate = date.toISOString().split('T')[0]
        return this.context.workdays.find(workday => {
            if (workday.date.split('T')[0] === formattedDate) {
                return workday
            }
        })
    }

    render() {
        //console.log(this.findWorkdayData(this.props.date))
        if (this.dataEntered(this.props.date)) {
            let daysData = this.getDaysData(this.props.date);
            //let formattedDate = this.props.date.toISOString().split('T')[0]
            //let user_id = daysData.user_id
            //console.log(daysData)
            return (
                <>
                    <form
                        className='new-workday-form'
                    >
                        <h3>Summary</h3>
                        <div>
                            <Label className='workday-display'>Date:</Label>
                            <Label className='workday-display-data'>{daysData.date.split('T')[0]}</Label>
                        </div>
                        <div>
                            <Label className='workday-display'>Hours Worked:</Label>
                            <Label className='workday-display-data'>{daysData.hours}</Label>
                        </div>
                        <div>
                            <Label className='workday-display'>Downs Dealt:</Label>
                            <Label className='workday-display-data'>{daysData.downs}</Label>
                        </div>
                        <div>
                            <Label className='workday-display'>Tokes Earned:</Label>
                            <Label className='workday-display-data'>${daysData.tokes}</Label>
                        </div>
                        <div>
                            <Label className='workday-display'>Notes:</Label>
                            <Label className='workday-display-data'>{daysData.notes}</Label>
                        </div>
                        <button type='button' className='day-submit-button' onClick={this.handleDelete}>Delete Workday</button>
                    </form>
                </>
            );
        };
        return (
            <form
                className='new-workday-form'
                onSubmit={this.handleSubmit}
            >
                <h3>Enter Workday Data</h3>
                <div>
                    <Label htmlFor='date-input' className='workday-label'>Date:</Label>
                    <Input
                        className='workday-input'
                        value={this.props.date}
                        onChange={this.props.onChange}
                        readOnly
                        id='date-input'
                        name='date'
                        required
                    />
                </div>
                <div>
                    <Label htmlFor='hours-input' className='workday-label'>Hours Worked:</Label>
                    <Input
                        className='workday-input'
                        id='hours-input'
                        name='hours'
                        required
                    />
                </div>
                <div>
                    <Label htmlFor='downs-input' className='workday-label'>Downs Dealt:</Label>
                    <Input
                        className='workday-input'
                        id='downs-input'
                        name='downs'
                        required
                    />
                </div>
                <div>
                    <Label htmlFor='tokes-input' className='workday-label'>Tokes Earned:</Label>
                    <Input
                        className='workday-input'
                        id='tokes-input'
                        name='tokes'
                        required
                    />
                </div>
                <div>
                    <Label htmlFor='notes-input' className='notes'>Notes:</Label>
                </div>
                <div>
                    <Textarea
                        className='workday-textarea'
                        id='notes-input'
                        name='notes'
                    />
                </div>
                <Button type='submit' className='day-submit-button'>Add New Workday</Button>
            </form>
        );
    };
};
