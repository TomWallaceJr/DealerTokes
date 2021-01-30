import config from '../config';
import TokenService from './token-service';

const WorkdayApiService = {
    postNewWorkday(workday) {
        return fetch(`${config.API_ENDPOINT}/workday`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(workday)
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    getWorkdayDataByDate(date) {
        fetch(`${config.API_ENDPOINT}/workday/${this.context.user_id}/date/${date}`, {
            headers: {
                authorization: `bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
            .then(res => console.log(res))
    }
}

export default WorkdayApiService