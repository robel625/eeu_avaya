import React from 'react';
import { useEffect, useState } from 'react';
import AddCustomer from '../../components/eeu/AddCustomer';
import AddCsc from '../../components/eeu/AddCsc';
import { useSelector, useDispatch } from 'react-redux';
import { getDataAPI, patchDataAPI } from '../../utils/fetchData';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import LoadIcon from '../../images/loading.gif';
import { Link } from 'react-router-dom';
import {
  searchCustomer,
  clearsearchCustomer,
  getCustomer,
} from '../../redux/actions/eeuAction';

const CustomerTop = ({ setSearch, setCustomer, customer, search }) => {
  const [close, setClose] = useState(true);
  const [cscPop, setCscPop] = useState(false);
  const [customerd, setCustomerd] = useState('');

  const dispatch = useDispatch();

  const { eeu, auth, theme } = useSelector((state) => state);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setSearch(eeu.customersearch);
    if (eeu.customersearch?.length === 1) {
      setCustomer(eeu.customersearch[0]);
        let id = eeu.customersearch[0]._id;
       if(eeu.customer?._id !== id){
         dispatch(getCustomer({id, auth}))
       }
    }
    if (eeu.customersearch?.length === 0) {
      setCustomer('');
    }
  }, [eeu.customersearch, search]);

  
  console.log('customerd', customerd);

  async function fetchData() {}
  fetchData();

  const initialState = {
    bp: '',
    name: '',
    phone: '',
    rsg: '',
  };
  const [searchData, setSearchData] = useState(initialState);
  const { bp, name, phone, rsg } = searchData;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bp && !name && !phone & !rsg) return;

    dispatch(searchCustomer({ bp, name, phone, rsg, auth }));

    // try {
    //   setLoad(true);
    //   const res = await getDataAPI(
    //     `searchCustomer?bp=${bp}&name=${name}&phone=${phone}&rsg=${rsg}`,
    //     auth.token
    //   );
    //   setSearch(res.data.customer);
    //   if (res.data.customer.length === 1) {
    //     setCustomer(res.data.customer[0]);
    //   }

    //   setLoad(false);
    // } catch (err) {
    //   dispatch({
    //     type: GLOBALTYPES.ALERT,
    //     payload: { error: err.response.data.msg },
    //   });
    // }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setSearch([]);
    setCustomer('');
    setSearchData({ ...initialState });
    dispatch(clearsearchCustomer());
    //dispatch(searchCustomer({ bp: '', name: '', phone: '', rsg: '', auth }));
  };

  const handlestring = async (e) => {
    for (let i = 8; i < 6867; i++) {
      e.preventDefault();
      const res = await patchDataAPI(
        `/updateCustomerstring/${i}`,
        i,
        auth.token
      );
    }
  };
  return (
    <>
      {eeu.loading ? (
        <img className="d-block mx-auto" src={LoadIcon} alt="loading" />
      ) : (
        <></>
      )}
      <div className="c_cardBox">
        <div className="c_card">
          <div className="searchphone">
            <div className="c_title">Search Createria</div>
            {eeu.phone.phone && (
              <div className="c_title">{eeu?.phone?.phone}</div>
            )}
          </div>
          <hr className="searchHr"></hr>
          <div className="c_bottom">
            <form onSubmit={handleSubmit}>
              <div className="c_item">
                <div className="c_itemTitle">BP</div>
                <div className="c_comma">:</div>
                <input
                  type="text"
                  className="form-control c_input"
                  id="bp"
                  name="bp"
                  placeholder="Business Partner"
                  onChange={handleChangeInput}
                  value={bp}
                />
              </div>
              <div className="c_item">
                <div className="c_itemTitle">Name</div>
                <div className="c_comma">:</div>
                <input
                  type="text"
                  className="form-control c_input"
                  id="name"
                  name="name"
                  placeholder="Name"
                  onChange={handleChangeInput}
                  value={name}
                />
              </div>
              <div className="c_item">
                <div className="c_itemTitle">Phone</div>
                <div className="c_comma">:</div>
                <input
                  type="text"
                  className="form-control  c_input "
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  onChange={handleChangeInput}
                  value={phone}
                />
              </div>
              <div className="c_item">
                <div className="c_itemTitle">RSG</div>
                <div className="c_comma">:</div>
                <input
                  type="text"
                  className="form-control  c_input "
                  id="rsg"
                  name="rsg"
                  placeholder="RSG"
                  onChange={handleChangeInput}
                  value={rsg}
                />
              </div>


              <div className="c_btncntrl">
                <button onClick={handleReset} className="btn btn-dark w-42">
                  Reset
                </button>

                <button type="submit" className="btn btn-dark w-42">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className={`c_card ${customer?._id ? 'show' : 'hidden'}`}>
          <div className="c_title">Information</div>
          <hr className="searchHr"></hr>
          <div className="label">
            <div className="label-key">Full Name :</div>
            <div className="label-value">{customer?.name}</div>
          </div>
          <div className="label">
            <div className="label-key">phone :</div>
            <div className="label-value">{customer?.phone}</div>
          </div>
          <div className="label">
            <div className="label-key">Email :</div>
            <div className="label-value">{customer?.Email}</div>
          </div>
          <div className="label">
            <div className="label-key">address :</div>
            <div className="label-value">{customer?.address}</div>
          </div>
          <hr></hr>
          {customer?._id && (
            <>
              {' '}
              <div className="label">
                <div className="label-key">bp :</div>
                <div className="label-value">{customer?.bp}</div>
              </div>
              <div className="label">
                <div className="label-key">district :</div>
                <div className="label-value">{customer?.district}</div>
              </div>
              <div className="label">
                <div className="label-key">csc :</div>
                <div className="label-value">{customer?.csc}</div>
              </div>
              <div className="label">
                <div className="label-key">rsg :</div>
                <div className="label-value">{customer?.rsg}</div>
              </div>
            </>
          )}
          <hr></hr>
          {customer?._id && (
            <Link to={`/eeu/${customer?._id}`}>
              <button className="btn btn-dark w-42">Add New complain</button>
            </Link>
          )}
        </div>
        {load && <img className="loading" src={LoadIcon} alt="loading" />}
      </div>
    </>
  );
};

export default CustomerTop;
