/**
 * Created by osetskiy on 4/13/2017.
 */
import config from '../config';
const server = config.server;
export const CHANGE_LOGIN_PSWRD = 'CHANGE_LOGIN_PSWRD';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const RECEIVE_TOKEN = 'RECIEVE_TOKEN';
export const ACCOUNT_EXIT = 'ACCOUNT_EXIT';
export const  RECEIVE_ERROR ='RECEIVE_ERROR_LOGIN';
import {browserHistory} from 'react-router';
import {accountChange} from './index';


export const receiveTOKEN = (json) => (
    {
        type: RECEIVE_TOKEN,
        response: json,

    }
)

export const requestTOKEN = (user) => (
    {
        type: REQUEST_TOKEN,
        user: user
    }
)

const accountExitAction = () => (
    {
        type: ACCOUNT_EXIT

    }
)

export const accountExit = () => (dispatch, getState) => {
    dispatch(accountExitAction());
    browserHistory.push('/')

}
export const receiveError = (json) => ({
    type: RECEIVE_ERROR,
    data: json,
    receivedAt: Date.now()
})

export const changeLoginPswrd = (event) => (
    {
        type: CHANGE_LOGIN_PSWRD,
        field: event.target.name,
        value: event.target.value
    }
)

export const submit = () => (dispatch, getState) => {
    let user = getState().login.user;
    let capchaChallange =getState().capcha.ok;

    if(user.login===""||user.password==="") {
        return dispatch(receiveError({errorMSG: "please enter login and password"}));

    }
    if(!capchaChallange) {
        return dispatch(receiveError({errorMSG: "you must pass captcha challenge"}));

    }

    dispatch(requestTOKEN(user));    return fetch(server + `/api/login`, {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',

        },
        method: 'POST',
        body: JSON.stringify(user)
    })
        .then(response => {
            if (response.ok) {
                response.json().then(json => {
                    dispatch(receiveTOKEN(json));
                    dispatch(accountChange(json.account.accounts[0]))
                    browserHistory.push('/')

                })
            } else {
                throw new Error(response.statusText);

            }
        })
        .catch((Error) => {
            dispatch(receiveError({errorMSG: Error.message}));
        })

}