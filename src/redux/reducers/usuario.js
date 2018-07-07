import * as types from '../constants'


const initialState = {
    data: {},
    errors: [],
    success: false,
    isFetching: false,
}
const usuario = (state = initialState, action) =>{
    switch (action.type) {
        case types.FETCH_LOGIN_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.FETCH_LOGIN_SUCCESS:
            return {
                ...state,
                ...action.data,
                isFetching: false
            }
        case types.FETCH_LOGIN_FAILURE:
            return{
                ...state,
                isFetching: false,
                errors: []
            }
        default:
            return state
    }
}

export default usuario;