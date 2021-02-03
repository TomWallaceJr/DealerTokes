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

    getTokesByDate(date, userId) {
        fetch(`${config.API_ENDPOINT}/workday/${userId}/date/${date}`, {
            headers: {
                authorization: `bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
        // .then(res => console.log('response -', res.tokes))
    },

    deleteWorkday(userId, date) {
        fetch(`${config.API_ENDPOINT}/workday/${userId}/date/${date}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${TokenService.getAuthToken()}`,
            },
        })
            .catch(error => console.error({ error }))
    }
};

export default WorkdayApiService;