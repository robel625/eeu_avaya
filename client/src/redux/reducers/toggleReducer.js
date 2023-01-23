import { GLOBALTYPES } from '../actions/globalTypes'

const initialState = false

const toggleReducer = (state = initialState, action) => {
    switch (action.type){
        case GLOBALTYPES.TOGGLE:
            return action.payload;
        default:
            return state;
    }
}


export default toggleReducer