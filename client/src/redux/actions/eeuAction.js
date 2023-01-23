//import { postDataAPI } from '../../utils/fetchData'
import { GLOBALTYPES, DeleteData } from './globalTypes';
import { getDataAPI, patchDataAPI ,postDataAPI} from '../../utils/fetchData';

export const EEU_TYPES = {
    LOADING: 'LOADING_EEU',
    GET_ID: 'GET_CUSTOMER_ID',
    GET_CUSTOMER: 'GET_CUSTOMER',
    GET_CreatedComplain: 'GET_CreatedComplain',
    GET_COMPLAIN: 'GET_COMPLAIN',
    GET_COMPLAINBYAGENT: 'GET_COMPLAINBYAGENT',
    GET_CUSTOMERSEARCH: 'GET_CUSTOMERSEARCH',
    PHONE: 'PHONE',
  };

export const addCustomer = (data,auth) => async (dispatch) => {
    // const check = valid(data)
    // if(check.errLength > 0)
    // return dispatch({type: GLOBALTYPES.ALERT, payload: check.errMsg})

    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})

        const res = await postDataAPI('addCustomer', data, auth.token)

        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                success: res.data.msg
            } 
        })
    } catch (err) {
        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                error: err.response.data.msg
            } 
        })
    }
}

export const updateCustomer = (customerData, auth) => async (dispatch) => {
    console.log("customerData1265",customerData)
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await patchDataAPI(`updateCustomer/${customerData._id}`,
          customerData,
        auth.token
      );
      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const addCsc = (data,auth) => async (dispatch) => {
    // const check = valid(data)
    // if(check.errLength > 0)
    // return dispatch({type: GLOBALTYPES.ALERT, payload: check.errMsg})

    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})

        const res = await postDataAPI('addCsc', data, auth.token)

        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                success: res.data.msg
            } 
        })
    } catch (err) {
        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                error: err.response.data.msg
            } 
        })
    }
}

export const searchCustomer = ({ bp, name, phone, rsg, auth})=> async (dispatch) =>{
  try{
       dispatch({ type: EEU_TYPES.LOADING, payload: true });
       const res = await getDataAPI(
        `searchCustomer?bp=${bp}&name=${name}&phone=${phone}&rsg=${rsg}`,
        auth.token
      );
  
        const customer = res;

        console.log("costomer_search", customer.data)
  
        dispatch({
          type: EEU_TYPES.GET_CUSTOMERSEARCH,
          payload: customer.data.customer,
        });

        dispatch({
          type: EEU_TYPES.PHONE,
          payload: {phone: phone, bp:bp, name:name, rsg:rsg},
        });

         
        dispatch({ type: EEU_TYPES.LOADING, payload: false });

  }catch (err) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      }
}


export const clearsearchCustomer = ()=> async (dispatch) =>{
  try{
    console.log("clear")
       dispatch({ type: EEU_TYPES.LOADING, payload: true });
  
        dispatch({
          type: EEU_TYPES.GET_CUSTOMERSEARCH,
          payload: [],
        });

        dispatch({
          type: EEU_TYPES.PHONE,
          payload: {},
        });
        dispatch({ type: EEU_TYPES.LOADING, payload: false });

  }catch (err) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      }
}


export const getCustomer = ({ id, auth }) => async (dispatch) => {
    try {
       dispatch({ type: EEU_TYPES.LOADING, payload: true });
        const res = await getDataAPI(`/customer/${id}`, auth.token);
        const res1 = await getDataAPI(`/complain/${id}`, auth.token);
  
        const customer = res;
        const complain = res1;

        console.log("complainmacth",complain.data)
  
        dispatch({
          type: EEU_TYPES.GET_CUSTOMER,
          payload: customer.data,
        });
  
        dispatch({
          type: EEU_TYPES.GET_COMPLAIN,
          payload: complain.data,
        });

        
  
        dispatch({ type: EEU_TYPES.LOADING, payload: false });
      } catch (err) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      }
}

export const createComplain = (complainData,auth) => async (dispatch) => {
    try {
        dispatch({ type: EEU_TYPES.LOADING, payload: true });
         //console.log("complainDataAction",userData)
         const res = await postDataAPI('createComplain', complainData, auth.token)

        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                success: res.data.msg
            } 
        })

        dispatch({
            type: EEU_TYPES.GET_CreatedComplain,
            payload: res.data.saved ,
          });


        dispatch({ type: EEU_TYPES.LOADING, payload: false });
    } catch (err) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      }
}


export const getComplainbyAgent = ({auth }) => async (dispatch) => {
  try {
      console.log("getcomplainbyAgent")
     dispatch({ type: EEU_TYPES.LOADING, payload: true });
      const res1 = await getDataAPI(`complainbyagent`, auth.token);

      const complain = res1;

      dispatch({
        type: EEU_TYPES.GET_COMPLAINBYAGENT,
        payload: complain.data.complain,
      });

      console.log("actioncomplaindata",complain.data.complain)

      dispatch({ type: EEU_TYPES.LOADING, payload: false });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
}

