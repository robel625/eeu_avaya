import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { createComplain } from '../../redux/actions/eeuAction';
import { postDataAPI } from '../../utils/fetchData';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

const ComplainLeft = () => {
  const { eeu, auth, socket } = useSelector((state) => state);
  const [complainData, setComplainData] = useState({
    bp: eeu?.customer?.bp,
    description: '',
    catagory1: 'Supply',
    catagory2: '',
    phone: eeu?.customer?.phone,
    address: '',
    status: 'new',
    customer_id: eeu?.customer?._id,
    name: eeu?.customer?.name,
    rsg: eeu?.customer?.rsg,
    created_by: auth.user.username,
  });
  //const [customer, setCustomer] = useState('')
  const {
    bp,
    description,
    catagory1,
    catagory2,
    phone,
    address,
    status,
    customer_id,
    name,
    rsg,
  } = complainData;

  const [created, setCreated] = useState('');
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData(auth.user);
  }, [auth.user]);

  console.log('eeuc7', complainData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComplainData({ ...complainData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //dispatch(createComplain(complainData,auth));
    try {
      if (!description)
        return dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: 'Please add description.' },
        });

      if (!catagory2)
        return dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: 'Please add your Catagory 2.' },
        });

      const res = await postDataAPI('createComplain', complainData, auth.token);
      socket.emit('createComplain',res.data.saved)
      window.location.href = `../complain/${res.data.saved._id}`;
      setCreated(res.data.saved);
      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
      console.log('exist', res.data.msg);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

  console.log('created', created);

  return (
    <div>
      <div className="complainLeft">
        {!created && (
          <form onSubmit={handleSubmit} action="nextpage.php">
            <div className="complainLeftWrapper">
              <ul className="complainList">
                <li className="complainListItem">
                  <div className="complainInfoKey">ID :</div>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    onChange={handleChange}
                    className="complaininfoValue"
                  ></input>
                </li>
                <li className="complainListItem">
                  <div className="complainInfoKey">Description :</div>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={description}
                    onChange={handleChange}
                    className="complaininfoValue"
                  ></input>
                </li>
                <li className="complainListItem">
                  <div className="complainInfoKey">Customer :</div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={complainData?.name}
                    className="complaininfoValue"
                  ></input>
                </li>
                <li className="complainListItem">
                  <div className="complainInfoKey">Employee responsible :</div>
                  <input
                    type="text"
                    id="rsg"
                    name="rsg"
                    value={complainData?.rsg}
                    className="complaininfoValue"
                  ></input>
                </li>
              </ul>
              <hr className="complainHr" />
              <ul className="complainList">
                <li className="complainListItem">
                  <div className="complainInfoKey">Status :</div>
                  <span className="">
                    <select
                      onChange={handleChange}
                      value={complainData['status'] || 'New'}
                      name="status"
                      className="complaininfoValue "
                    >
                      <option>New</option>
                      <option>Dispatcher Required</option>
                      <option>Inspection Required</option>
                      <option>Inspection Found OK</option>
                      <option>Issue due to Customer</option>
                      <option>Issue due to EEU</option>
                      <option>In Progress</option>
                      <option>EAM order Required</option>
                      <option>Process Completed</option>
                      <option>Cancelled</option>
                      <option>Rejected</option>
                    </select>
                  </span>
                </li>
                <li className="complainListItem">
                  <div className="complainInfoKey">Catagory 1 :</div>
                  <span className=" ">
                    <select
                      onChange={handleChange}
                      value={complainData['catagory1'] || 'Supply'}
                      name="catagory1"
                      className="complaininfoValue"
                    >
                      <option value="Supply">Supply</option>
                      <option value="Meter">Meter</option>
                      <option value="Billing">Billing</option>
                      <option value="Customer">Customer</option>
                      <option value="EEU Employee">EEU Employee</option>
                      <option value="EEU Service">EEU Service</option>
                      <option value="Miscellaneous">Miscellaneous</option>
                    </select>
                  </span>
                </li>
                <li className="complainListItem">
                  <div className="complainInfoKey">Catagory 2 :</div>
                  <span className=" ">
                    <select
                      onChange={handleChange}
                      value={complainData['catagory2'] || 'No supply'}
                      name="catagory2"
                      className="complaininfoValue"
                    >
                      <option></option>
                      {complainData['catagory1'] === 'Supply' && (
                        <>
                          <option>No Supply</option>
                          <option>Voltage Drop/Over Voltage</option>
                        </>
                      )}
                      {complainData['catagory1'] === 'Meter' && (
                        <>
                          <option>CT Damage</option>
                          <option>Energy Meter Malfunctioning</option>
                          <option>Foreign objects inserted into meter</option>
                          <option>Incorrect Number of Digits</option>
                          <option>Energy Meter Lost</option>
                          <option>Board/Breaker/Cable Burnt</option>
                          <option>Meter Damage/Burnt</option>
                          <option>
                            Meter change without customer acknowledgment
                          </option>
                          <option>Meter Sealing Disconnected</option>
                          <option>Loose Meter Terminal</option>
                          <option>Meter Testing by Customer Request</option>
                          <option>Reverse Reading Meter</option>
                          <option>VT Damage</option>
                          <option>Wrong Multiplier Factor</option>
                          <option>Meter With CT Damage</option>
                          <option>Meter with VT Damage</option>
                          <option>Meter with CT/VT Damage</option>
                        </>
                      )}
                      {complainData['catagory1'] === 'Billing' && (
                        <>
                          <option>Billing Error Correction</option>
                          <option>
                            Bill not Generated/Balance Brought Forward
                          </option>
                          <option>Estimated Readings</option>
                          <option>
                            Late of Name Transfer / Meter Change details
                          </option>
                          <option>Tariff Change</option>
                        </>
                      )}
                      {complainData['catagory1'] === 'Customer' && (
                        <>
                          <option>Customer's internal line problem</option>
                        </>
                      )}
                      {complainData['catagory1'] === 'EEU Employee' && (
                        <>
                          <option>
                            Suspection on Corruption of EEU Employee
                          </option>
                          <option>Late Response from EEU Employee</option>
                          <option>Misbehaviours of EEU Employee</option>
                          <option>
                            Unavailability of Manager / Employee in EEU Office
                          </option>
                          <option>Other EEU Employee complaint</option>
                        </>
                      )}
                      {complainData['catagory1'] === 'EEU Service' && (
                        <>
                          <option>Customer Request on Approval of Head</option>
                          <option>
                            Estimation Sheet/Cost of Estimation/Demand Note
                          </option>
                          <option>Lose of Customer File</option>
                          <option>Commercial & Technical Feasibility</option>
                          <option>Meter Not Installed/Replaced/Removed</option>
                          <option>Other EEU Services complaint</option>
                        </>
                      )}
                      {complainData['catagory1'] === 'Miscellaneous' && (
                        <>
                          <option>Only to receive payment</option>
                        </>
                      )}
                    </select>
                  </span>
                </li>
              </ul>
              <hr className="complainHr" />
              <li className="complainListItem">
                <div className="complainInfoKey">Phone :</div>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={handleChange}
                  className="complaininfoValue"
                ></input>
              </li>
              <li className="complainListItem">
                <div className="complainInfoKey">Address :</div>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  onChange={handleChange}
                  className="complaininfoValue"
                ></input>
              </li>
              <hr className="complainHr" />
              <ul className="complainList">
                {/* <li className="complainListItem">
              <div className="complainInfoKey">Request Started :</div>
              <input className="complaininfoValue"></input>
           </li>
           <li className="complainListItem">
              <div className="complainInfoKey">Request Updated  :</div>
              <input className="complaininfoValue" ></input>
           </li> */}
                <li className="complainListItem">
                  <div className="complainInfoKey">First Response by :</div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={userData?.username}
                    className="complaininfoValue"
                  ></input>
                </li>
              </ul>
            </div>
            <div className="">
              <button
                type="submit"
                className="complainbtn"
                // disabled={!description.trim() || !catagory2.trim()}
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>

      {created && (
        <>
          {' '}
          <div className="label">
            <div className="label-key">ID :</div>
            <div className="label-value">{created?.id} </div>
          </div>
          <div className="label">
            <div className="label-key">Description :</div>
            <div className="label-value">{created?.description} </div>
          </div>
          <div className="label">
            <div className="label-key">Customer :</div>
            <div className="label-value">{created?.customer?.name} </div>
          </div>
          <div className="label">
            <div className="label-key">responsible :</div>
            <div className="label-value">{created?.rsg} </div>
          </div>
          <hr></hr>
          <div className="label">
            <div className="label-key">Status :</div>
            <div className="label-value">{created?.status}</div>
          </div>
          <div className="label">
            <div className="label-key">Catagory 1 :</div>
            <div className="label-value">{created?.catagory1} </div>
          </div>
          <div className="label">
            <div className="label-key">Catagory 2 :</div>
            <div className="label-value">{created?.catagory2} </div>
          </div>
          <hr></hr>
          <div className="label">
            <div className="label-key">Mobile :</div>
            <div className="label-value">{created?.phone}</div>
          </div>
          <div className="label">
            <div className="label-key">Address :</div>
            <div className="label-value">{created?.address} </div>
          </div>
          <hr></hr>
          <div className="label">
            <div className="label-key">Request Started :</div>
            <div className="label-value">
              {new Date(created?.createdAt).toLocaleString()}{' '}
            </div>
          </div>
          <div className="label">
            <div className="label-key">Request Updated :</div>
            <div className="label-value">{}</div>
          </div>
          <div className="label">
            <div className="label-key">First Response by :</div>
            <div className="label-value">{created?.created_by}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default ComplainLeft;
