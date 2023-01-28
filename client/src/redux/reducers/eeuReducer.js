import { EEU_TYPES } from '../actions/eeuAction'
import { EditData } from '../actions/globalTypes'

const initialState = {
    loading: false,
    complainAgent:[],
    complain: [],
    customer: {},
    saved:{},
    customersearch: [],
    phone: {},
    users: [],
}

const eeuReducer = (state = initialState, action) => {
    switch (action.type){
        case EEU_TYPES.LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case EEU_TYPES.GET_CUSTOMER:
            return {
                ...state,
                customer:  action.payload.customer[0]
            };
        case EEU_TYPES.GET_CreatedComplain:
            return {
                ...state,
                saved:  action.payload
            };
        case EEU_TYPES.GET_COMPLAIN:
                return {
                    ...state,
                    complain:  action.payload.complain
                };
        case EEU_TYPES.GET_COMPLAINBYAGENT:
                return {
                    ...state,
                    complainAgent: action.payload 
                };
        case EEU_TYPES.GET_CUSTOMERSEARCH:
            return {
                ...state,
                customersearch: action.payload
            };
        case EEU_TYPES.PHONE:
            return {
                ...state,
                phone: action.payload
            };
        case EEU_TYPES.GET_ALLUSERS:
            return {
                ...state,
                users: action.payload.users
            };




                
                
        // case PROFILE_TYPES.UNFOLLOW:
        //     return {
        //         ...state,
        //         users: EditData(state.users, action.payload._id, action.payload)
        //     };
        // case PROFILE_TYPES.GET_ID:
        //     return {
        //         ...state,
        //         ids: [...state.ids, action.payload]
        //     };
        // case PROFILE_TYPES.GET_POSTS:
        //     return {
        //         ...state,
        //         posts: [...state.posts, action.payload]
        //     };
        // case PROFILE_TYPES.UPDATE_POST:
        //     return {
        //         ...state,
        //         posts: EditData(state.posts, action.payload._id, action.payload)
        //    };
        default:
            return state;
    }
}

export default eeuReducer