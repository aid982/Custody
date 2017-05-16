/**
 * Created by osetskiy on 4/14/2017.
 */
import { combineReducers } from 'redux'
import {
   ACCOUNT_CHANGE, REQUEST_DATA,RECEIVE_DATA,INVALIDATE_DATA,DATE_CHANGE,RECEIVE_ERROR
} from '../Actions'
import  {login} from '../Reducers/login'
import  {changePswd} from '../Reducers/changePsw'
import  {restorePassword} from '../Reducers/restorePassword'
import  {capcha} from '../Reducers/capcha'

const getStatement = (state = { __html:"" }, action) => {
    switch (action.type) {
        case RECEIVE_DATA:
            return {
                ...state,
                __html:action.data
            }
        default:
            return state
    }
}
const changeDate = (state= {account:"",date1:{},date2:{}},action) =>{
    switch (action.type) {
        case ACCOUNT_CHANGE:
            return {
                ...state,
                account:action.value
            }
        case DATE_CHANGE:
            return {
                ...state,
                [action.name]:action.data
            }
        default:
            return state
    }

}

const statement = (state = { error:{errorMSG:""},isFetching:false,dataFromAPI :{__html:""},input:{account:"",date1:new Date(),date2:new Date()}}, action) => {
    switch (action.type) {
        case INVALIDATE_DATA:
        case RECEIVE_DATA:
            return {
                ...state,
                error:{},
                dataFromAPI: getStatement(state.dataFromAPI, action),
                isFetching:false
            }
        case RECEIVE_ERROR:
            return {
                ...state,
                error:{errorMSG:action.data.errorMSG},
                isFetching:false
            }
        case REQUEST_DATA:
            return {
                ...state,
                isFetching:true
            }
        case ACCOUNT_CHANGE:
        case DATE_CHANGE:
            return {
                ...state,
                error:{},
                input: changeDate(state.input, action)
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    statement,
    login,
    changePswd,
    restorePassword,
    capcha

})

export default rootReducer
