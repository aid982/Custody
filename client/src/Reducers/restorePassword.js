/**
 * Created by osetskiy on 4/13/2017.
 */
import {
    CHANGE_DATA,RECIEVE_RESTORE_PSWD,REQUEST_RESTORE_PSWD,CLOSE_SNACK_BAR,RECIEVE_ERROR_RESTORE_PSWD
} from '../Actions/restorePswd';

import {
    RECIEVE_CAPCHA_TOKEN
} from '../Actions/capcha';


const changeData = (state = {email: ""}, action) => {
    switch (action.type) {
        case CHANGE_DATA:
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
        case RECIEVE_ERROR_RESTORE_PSWD:
            return {
                ...state,
                summary: (action.errorMSG)

            }
        default:
            return state
    }


}

export const restorePassword = (state = { data:{email: ""},errors: {},isFetching:false,snackBarOpen:false}, action) => {
    switch (action.type) {
        case REQUEST_RESTORE_PSWD:
            return {
                ...state,
                isFetching:true
            }
        case CHANGE_DATA:
            return {
                ...state,
                data: changeData(state.data, action),
                errors :{}

            }
        case RECIEVE_RESTORE_PSWD:
            return {
                ...state,
                isFetching:false,
                snackBarOpen:true,

            }
        case RECIEVE_ERROR_RESTORE_PSWD:
            return {
                ...state,
                isFetching:false,
                errors: updateErrors(state.errors, action)

            }
        case CLOSE_SNACK_BAR:
            return {
                ...state,
                snackBarOpen:false
            }
        case RECIEVE_CAPCHA_TOKEN:
            return {
                ...state,
                errors :{}
            }
        default:
            return state
    }
}

