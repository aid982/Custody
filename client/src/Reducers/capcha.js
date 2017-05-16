/**
 * Created by osetskiy on 4/13/2017.
 */
import {
    RECIEVE_CAPCHA_TOKEN,SEND_CAPCHA_TOKEN
} from '../Actions/capcha';




const verifyCapcha = (action) => {
    console.log(action);
    return true;
}
export const capcha = (state = { ok:false}, action) => {
    switch (action.type) {
        case SEND_CAPCHA_TOKEN:
            return {
                ...state
            }
        case RECIEVE_CAPCHA_TOKEN:
            return {
                ...state,
                ok: action.response.success,
            }
        default:
            return state
    }
}

