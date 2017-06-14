/**
 * Created by osetskiy on 4/13/2017.
 */
import config from '../config';
const server = config.server;
export const CHANGE_PSWRD = 'CHANGE_PSWRD'
export const REQUEST_CHANGE_PSWD = 'REQUEST_CHANGE_PSWD'
export const RECIEVE_CHANGE_PSWD = 'RECIEVE_CHANGE_PSWD'
export const RECIEVE_ERROR = 'RECIEVE_ERROR'
import {browserHistory} from 'react-router'


export const receivePasswordChange = (json) => (
    {
        type: RECIEVE_CHANGE_PSWD,
        response: json,

    }
)

export const requestPasswordChange = (user) => (
    {
        type: REQUEST_CHANGE_PSWD,
        user: user
    }
)


export const changePswrd = (event) => (
    {
        type: CHANGE_PSWRD,
        field: event.target.name,
        value: event.target.value
    }
)

export const submit = () => (dispatch, getState) => {
    let state = getState().changePswd;
    let isFetching = state.isFetching;
    let password1 = state.passwords.newPassword1;
    let password2 = state.passwords.newPassword2;
    if(isFetching) {
        return;
    }
    if (!(password1 === password2)) {
        return dispatch(receivePasswordChange({errorMSG: 'Your new password and confirmation password do not match. Please confirm and try again'}))
    }

    let passwords = {
        password_old: getState().changePswd.passwords.oldPassword,
        password: password1,
        login: getState().login.account.name
    };
    let token = getState().login.account.token;



    dispatch(requestPasswordChange(passwords));
    return fetch(server + `/api/accounts`, {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        method: 'PUT',
        body: JSON.stringify(passwords)
    })
        .then(response => {
            return response.json()
        })
        .then(json => {
            dispatch(receivePasswordChange(json))
            if (json.ok === 1) {
                browserHistory.push('/')
            }
        })

}

