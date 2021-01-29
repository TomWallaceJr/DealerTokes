import config from '../config';

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
            .then(console.log('body content -', workday))
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    }
}

export default WorkdayApiService