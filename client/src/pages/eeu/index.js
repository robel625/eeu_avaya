import { useEffect, useState } from 'react';
import AddCustomer from '../../components/eeu/AddCustomer';
import AddCsc from '../../components/eeu/AddCsc';
import { useSelector, useDispatch } from 'react-redux';
import { getDataAPI, patchDataAPI } from '../../utils/fetchData';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import LoadIcon from '../../images/loading.gif';
import { Link } from 'react-router-dom';
import { updateCustomer } from '../../redux/actions/eeuAction';

const ContactCenter = () => {
  const [close, setClose] = useState(true);
  const [createCustomerPop, setCreateCustomerPop] = useState(false);
  const [cscPop, setCscPop] = useState(false);
  const [search, setSearch] = useState([]);
  const [customer, setCustomer] = useState('');
  const [customerd, setCustomerd] = useState('');

  const dispatch = useDispatch();

  const { auth, theme } = useSelector((state) => state);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    // async function fetchData(){
    //   const res = await getDataAPI(`/customerdetail/${customer._id}`, auth.token);
    //   setCustomerd(res.data.customer[0])
    // }
    // fetchData();
  }, [customer]);

  console.log('customerd', customerd);

  async function fetchData() {}
  fetchData();

  const initialState = {
    bp: '',
    name: '',
    phone: '',
  };
  const [searchData, setSearchData] = useState(initialState);
  const { bp, name, phone } = searchData;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bp && !name && !phone) return;

    try {
      setLoad(true);
      const res = await getDataAPI(
        `searchCustomer?bp=${bp}&name=${name}&phone=${phone}`,
        auth.token
      );
      setSearch(res.data.customer);
      if (res.data.customer.length === 1) {
        setCustomer(res.data.customer[0]);
      }

      setLoad(false);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setSearch([]);
    setCustomer('');
    setSearchData({ ...initialState });
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
    <div>
      <div className="searchContainer">
        <div className="searchLeft">
          <div className="searchLeft1">
            <div className="searchspan">Search Customer</div>
            {/* <buttononClic className='addcustromer btn btn-dark w-42' onClick={() => setCreateCustomerPop(true)} >+ Add Customer</buttononClic>
                   <button className='addcustromer btn btn-dark w-42' onClick={() => setCscPop(true)} >+ csc</button> */}
            {/* <button className='addcustromer btn btn-dark w-42' onClick={handlestring} >+ csc</button> */}
          </div>
          {createCustomerPop && (
            <AddCustomer
              setCreateCustomerPop={setCreateCustomerPop}
              customer={customer}
            />
          )}
          {cscPop && <AddCsc setCscPop={setCscPop} />}
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
              <div className="form-key">Name :</div>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Name"
                onChange={handleChangeInput}
                value={name}
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

        <div className="searchRight">
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
      </div>
      {load && <img className="loading" src={LoadIcon} alt="loading" />}

      <div className="">
        <table className="content-table">
          <thead className="">
            <tr>
              <th className="">bp</th>
              <th className="">Name</th>
              <th className="">Phone</th>
              <th className="">district</th>
              <th className="">csc</th>
              <th className="">rsg</th>
              <th className="">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {search &&
              search.map((c) => (
                <tr
                  key={c._id}
                  onClick={() => setCustomer(c)}
                  className={`${c._id === customer._id ? 'active-row' : ''}`}
                  //className="active-row"
                  //style={{ background: c._id === customer._id ? "active-row" : "" }}
                >
                  <td>{c.bp}</td>
                  <td>{c.name}</td>
                  <td>{c.phone}</td>
                  <td>{c.district}</td>
                  <td>{c.csc}</td>
                  <td>{c.rsg}</td>
                  <td>
                    <button
                      className="btnEdit"
                      onClick={() => setCreateCustomerPop(true)}
                    >
                      Edit
                    </button>
                    {/* <button className="btnRemove">Remove</button> */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactCenter;
