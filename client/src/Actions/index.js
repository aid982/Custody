/**
 * Created by osetskiy on 4/14/2017.
 */
import config from '../config';
const server = config.server;
export const REQUEST_DATA = 'REQUEST_DATA'
export const RECEIVE_DATA = 'RECEIVE_DATA'
export const RECEIVE_ERROR = 'RECEIVE_ERROR'
export const INVALIDATE_DATA = 'INVALIDATE_DATA'
export const DATE_CHANGE = 'DATE_CHANGE'
export const ACCOUNT_CHANGE = 'ACCOUNT_CHANGE'
import FormatDate from '../Modules/DateUtil';
import {browserHistory} from 'react-router'


export const dateChange = (name, data) => ({
    type: DATE_CHANGE,
    name: name,
    data: data

})

export const accountChange = (value) => ({
    type: ACCOUNT_CHANGE,
    value: value
})


export const requestData = (query) => ({
    type: REQUEST_DATA,
    query: query
})

export const receiveData = (json) => ({
    type: RECEIVE_DATA,
    data: json,
    receivedAt: Date.now()
})

export const receiveError = (json) => ({
    type: RECEIVE_ERROR,
    data: json,
    receivedAt: Date.now()
})

const fetchData = (query, token) => dispatch => {
    dispatch(requestData(query))

    return fetch(server + `/api/report`, {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        method: "POST",
        body: JSON.stringify(query)
    }).then(response => {
        if (response.ok) {
            response.text().then(
                (data) => {
                    dispatch(receiveData(data))
                    browserHistory.push('/report')

                }
            );
        } else {
            if (response.status === 401) {
                browserHistory.push('/login')
            } else {
                throw new Error(response.statusText);
            }
        }

    }).catch((Error) => {
        dispatch(receiveError({errorMSG: Error.message}));
    });


}

const shouldFetchData = (state) => {
    if (state.statement.isFetching) {
        return false
    }
    return true;
}

export const fetchDataIfNeeded = () => (dispatch, getState) => {
    let state = getState();
    let input = state.statement.input;
    if(!input.account) {
        dispatch(receiveError({errorMSG: "You must choose account "}));
        return false;
    }

    if(input.date1>input.date2) {
        dispatch(receiveError({errorMSG: "Wrong dates !!"}));
        return false;
    }

    let dataJSON = {
        account: input.account,
        date1: FormatDate(input.date1),
        date2: FormatDate(input.date2)
    };


    if (shouldFetchData(state)) {
        return dispatch(fetchData(dataJSON, state.login.account.token))
    }
}
