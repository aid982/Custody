/**
 * Created by osetskiy on 4/13/2017.
 */
import {
    CHANGE_LOGIN_PSWRD, RECEIVE_TOKEN,ACCOUNT_EXIT,RECEIVE_ERROR
} from '../Actions/login';

import {
    RECIEVE_CAPCHA_TOKEN
} from '../Actions/capcha';


const changeUser = (state = {login: "", password: ""}, action) => {
    switch (action.type) {
        case CHANGE_LOGIN_PSWRD:
            return {
                ...state,
                [action.field]: action.value
            }
        default:
            return state
    }
}
const getAccountFromStorage = () => {
    let account = localStorage.getItem('account');
    try {
        account = JSON.parse(account);
    } catch (Err) {
        account = undefined
    }

    return account;
}

const saveAccountToStorage = (response) => {
    localStorage.setItem('account', JSON.stringify(response.account));
    return response.account;
}

const updateErrors = (state = {summary: "", login: "", password: ""}, action) => {
    switch (action.type) {
        case RECEIVE_ERROR:
            return {
                ...state,
                summary: (action.data.errorMSG)

            }
        default:
            return state
    }


}

export const login = (state = {account: getAccountFromStorage(),user:{login:"",password:""}, errors: {}}, action) => {
    switch (action.type) {
        case CHANGE_LOGIN_PSWRD:
            return {
                ...state,
                errors:{},
                user: changeUser(state.user, action)

            }
        case RECIEVE_CAPCHA_TOKEN:
            return {
                ...state,
                errors:{}
            }
        case RECEIVE_TOKEN:
            return {
                ...state,
                account: saveAccountToStorage(action.response)

            }
        case RECEIVE_ERROR:
            return {
                ...state,
                errors: updateErrors(state.errors, action),

            }

        case ACCOUNT_EXIT:
            return {
                ...state,
                account: saveAccountToStorage({})
            }
        default:
            return state
    }
}

