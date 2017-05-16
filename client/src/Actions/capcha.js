/**
 * Created by osetskiy on 4/13/2017.
 */
export const SEND_CAPCHA_TOKEN = 'SEND_CAPCHA_TOKEN'
export const RECIEVE_CAPCHA_TOKEN = 'RECIEVE_CAPCHA_TOKEN'
import config from '../config';
const server = config.server;


export const sendCapchaToken = () => (
    {
        type: SEND_CAPCHA_TOKEN
    }
)

export const reciveCapchaResponse = (response) => (
    {
        type:RECIEVE_CAPCHA_TOKEN,
        response: response,

    }
)


export const verifyCapcha = (token) => (dispatch) => {
    dispatch(sendCapchaToken());
    return fetch(server + `/api/capcha`, {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({token:token})
    }).then(response => {
        if (response.ok) {
            response.json().then(
                (data) => {
                    dispatch(reciveCapchaResponse (data))

                }
            );
        } else {
            if (response.status === 401) {

            } else {
                throw new Error(response.statusText);
            }
        }

    }).catch((Error) => {
        //dispatch(receiveError({errorMSG: Error.message}));
    });


}