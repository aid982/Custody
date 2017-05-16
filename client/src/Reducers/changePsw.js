/**
 * Created by osetskiy on 4/13/2017.
 */
import {
    CHANGE_PSWRD,RECIEVE_CHANGE_PSWD,REQUEST_CHANGE_PSWD
} from '../Actions/changePswd';


const changePassword = (state = {oldPassword: "", newPassword1: "",newPassword2: ""}, action) => {
    switch (action.type) {
        case CHANGE_PSWRD:
            return {
                ...state,
                [action.field]: action.value
            }
        default:
            return state
    }
}

const updateErrors = (state = {summary: "", email: "", password: ""}, action) => {
    switch (action.type) {
        case RECIEVE_CHANGE_PSWD:
            return {
                ...state,
                summary: (action.response.errorMSG)

            }
        default:
            return state
    }


}

export const changePswd = (state = { passwords:{oldPassword: "", newPassword1: "",newPassword2: ""},errors: {},isFetching:false}, action) => {
    switch (action.type) {
        case REQUEST_CHANGE_PSWD:
            return {
                ...state,
                isFetching:true

            }
        case CHANGE_PSWRD:
            return {
                ...state,
                passwords: changePassword(state.passwords, action),
                errors :{}

            }
        case RECIEVE_CHANGE_PSWD:
            return {
                ...state,
                isFetching:false,
                errors: updateErrors(state.errors, action)

            }
        default:
            return state
    }
}

