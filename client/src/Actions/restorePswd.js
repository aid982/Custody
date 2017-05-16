/**
 * Created by osetskiy on 4/13/2017.
 */
import config from '../config';
const server = config.server;
export const CHANGE_DATA = 'CHANGE_DATA'
export const REQUEST_RESTORE_PSWD = 'REQUEST_RESTORE_PSWD'
export const RECIEVE_RESTORE_PSWD = 'RECIEVE_RESTORE_PSWD'
export const RECIEVE_ERROR_RESTORE_PSWD = 'RECIEVE_ERROR_RESTORE_PSWD'
export const CLOSE_SNACK_BAR = 'CLOSE_SNACK_BAR'
import {browserHistory} from 'react-router'




const receiveError = (msg) => (
    {
        type: RECIEVE_ERROR_RESTORE_PSWD,
        errorMSG: msg,

    }

)

export const receivePasswordRestore = (json) => (
    {
        type: RECIEVE_RESTORE_PSWD,
        response: json,

    }
)

export const requestPasswordRestore = (user) => (
    {
        type: REQUEST_RESTORE_PSWD,
        user: user
    }
)


export const changeData = (event) => (
    {
        type: CHANGE_DATA,
        field: event.target.name,
        value: event.target.value
    }
)

export const submit = () => (dispatch, getState) => {
    let state = getState().restorePassword;
    let capcha = getState().capcha.ok;

    let email = state.data.email;
    let isFetching = state.isFetching;
    if(isFetching) {
        return
    }
    if(email==="") {
        return  dispatch(receiveError("You must provide your email"))
    }

    if(!capcha) {
        return dispatch(receiveError("you must pass captcha challenge"));
    }



    dispatch(requestPasswordRestore(email));
    return fetch(server + `/api/accounts/email`, {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({email:email})
    })
        .then(response => {
            if (response.ok) {
                return response.json().then(json => {
                       dispatch(receivePasswordRestore(json))

                })
            } else {
                dispatch(receiveError("Wrong email"))
            }
        });


}

const closeSnackBarAction  = () => (
    {
        type: CLOSE_SNACK_BAR
    }
    )


export const closeSnackBar  = () => (dispatch) => {
    dispatch(closeSnackBarAction())
    browserHistory.push('/login')


}

