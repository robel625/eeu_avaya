import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { getDataAPI, patchDataAPI  } from '../../../utils/fetchData'
import { GLOBALTYPES } from '../../../redux/actions/globalTypes'



const SearchComplainLeft = ({setSearch}) => {

    
    const dispatch = useDispatch();

  const { auth, theme } = useSelector((state) => state);
       
    const initialState = {
        bp: '',
        requestid: '',
        phone: '',
      };
      const [searchData, setSearchData] = useState(initialState);
      const { bp, requestid, phone} = searchData;
    const handleChangeInput = (e) => {
      const { name, value } = e.target;
      setSearchData({ ...searchData, [name]: value });
    };

  const handleSubmit = async (e)  => {
    e.preventDefault()
    if(!bp && !requestid && !phone) return;

    try {
        const res = await getDataAPI(`searchComplain?bp=${bp}&requestid=${requestid}&phone=${phone}`, auth.token)
        setSearch(res.data.complain)
        console.log("searchComplain", res.data.complain )
        
    } catch (err) {
      console.log("err_complain",err )
        dispatch({
            type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}
        })
    }
    };

    

    const handleReset = async (e) => {
      e.preventDefault();
      setSearch([]);
      setSearchData({ ...initialState });

    }
    

    return (
        <>
          <div className="searchLeft">
               <div className="searchLeft1">
                  <div className='searchspan' >Search Complain</div>   
               </div>
               <hr className="searchHr"></hr>

               <form onSubmit={handleSubmit}>
                <div className="form-Item">
        <div className="form-key">BP :</div>
          <input
            type="text"
            className="form-control"
            id="bp"
            name="bp"
            placeholder="Business Partner"
            onChange={handleChangeInput}
            value={bp}
          />
        </div>

       <div className="form-Item">
        <div className="form-key">Phone :</div>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            placeholder="Phone"
            onChange={handleChangeInput}
            value={phone}
          />
        </div>

        <div className="form-Item">
        <div className="form-key">Service Request ID :</div>
          <input
            type="text"
            className="form-control"
            id="requestid"
            name="requestid"
            placeholder="Name"
            onChange={handleChangeInput}
            value={requestid}
          />
        </div>

         <div className="btncntrl">
        <button onClick={handleReset} className="btn btn-dark w-42">
          Reset
        </button>

        <button type="submit" className="btn btn-dark w-42">
          Search
        </button>
        </div>
              </form>

               </div>
        </>
    )

}

export default SearchComplainLeft