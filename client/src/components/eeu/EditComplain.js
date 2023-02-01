import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect, useRef } from 'react';
import { createComplain } from '../../redux/actions/eeuAction';
import { patchDataAPI } from '../../utils/fetchData';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import ReactToPrint from 'react-to-print';
import './editcomplain.css';

const EditComplain = ({ complain }) => {
  const { eeu, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const componentRef = useRef(null);

  const [editcomplain, setEditcomplain] = useState('');
  const [rescomplain, setRescomplain] = useState('');
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setEditcomplain(complain);
  }, [complain]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditcomplain({ ...editcomplain, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('editcomplain', 'here');
      const res = await patchDataAPI(
        `editComplain/${editcomplain._id}`,
        editcomplain,
        auth.token
      );
      setRescomplain(res.data.saved);
      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
      setEdit(false);
      console.log('existrecomplain', res.data.msg);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

  return (
    <div className="complainLeft">
      {edit && (
        <form onSubmit={handleSubmit}>
          <div className="complainLeftWrapper">
            <ul className="complainList">
              <li className="complainListItem">
                <div className="complainInfoKey">ID :</div>
                <input
                  type="text"
                  value={editcomplain?.id}
                  className="complaininfoValue"
                ></input>
              </li>
              <li className="complainListItem">
                <div className="complainInfoKey">Description :</div>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={editcomplain?.description}
                  onChange={handleChange}
                  className="complaininfoValue"
                ></input>
              </li>
              <li className="complainListItem">
                <div className="complainInfoKey">Customer :</div>
                <input
                  type="text"
                  value={editcomplain?.customer?.name}
                  className="complaininfoValue"
                ></input>
              </li>
              <li className="complainListItem">
                <div className="complainInfoKey">RSG :</div>
                <input
                  type="text"
                  id="rsg"
                  name="rsg"
                  value={editcomplain?.rsg}
                  className="complaininfoValue"
                ></input>
              </li>
              <li className="complainListItem">
                <div className="complainInfoKey">Employee responsible :</div>
                <input
                  type="text"
                  id="responsible"
                  name="responsible"
                  value={editcomplain?.responsible}
                  onChange={handleChange}
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
                    value={editcomplain['status'] || 'new'}
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
                    value={editcomplain['catagory1'] || 'Supply'}
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
                    value={editcomplain['catagory2'] || 'No supply'}
                    name="catagory2"
                    className="complaininfoValue"
                  >
                    <option></option>
                    {editcomplain['catagory1'] === 'Supply' && (
                      <>
                        <option>No Supply</option>
                        <option>Voltage Drop/Over Voltage</option>
                      </>
                    )}
                    {editcomplain['catagory1'] === 'Meter' && (
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
                    {editcomplain['catagory1'] === 'Billing' && (
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
                    {editcomplain['catagory1'] === 'Customer' && (
                      <>
                        <option>Customer's internal line problem</option>
                      </>
                    )}
                    {editcomplain['catagory1'] === 'EEU Employee' && (
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
                    {editcomplain['catagory1'] === 'EEU Service' && (
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
                    {editcomplain['catagory1'] === 'Miscellaneous' && (
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
                value={editcomplain?.phone}
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
                value={editcomplain?.address}
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
                  value={editcomplain?.created_by}
                  className="complaininfoValue"
                ></input>
              </li>
            </ul>
          </div>
          <div className="">
            <button
              type="submit"
              className="complainbtn"
              // disabled={!(editcomplain?.description.trim()) || !(editcomplain?.catagory2.trim()}
            >
              Save
            </button>
          </div>
        </form>
      )}

      {!edit && (
        <>
          <ReactToPrint
            trigger={() => <button className='print1'
            >Print</button>}
            content={() => componentRef.current}
          />
          <div ref={componentRef}>
            <div className="label">
              <div className="label-key">ID :</div>
              <div className="label-value">{editcomplain?.id} </div>
            </div>
            <div className="label">
              <div className="label-key">Description :</div>
              <div className="label-value">{editcomplain?.description} </div>
            </div>
            <div className="label">
              <div className="label-key">Customer :</div>
              <div className="label-value">{editcomplain?.customer?.name} </div>
            </div>
            <div className="label">
              <div className="label-key">RSG :</div>
              <div className="label-value">{editcomplain?.rsg} </div>
            </div>
            <div className="label">
              <div className="label-key">Responsible :</div>
              <div className="label-value">{editcomplain?.responsible} </div>
            </div>
            <hr></hr>
            <div className="label">
              <div className="label-key">Status :</div>
              <div className="label-value">{editcomplain?.status}</div>
            </div>
            <div className="label">
              <div className="label-key">Catagory 1 :</div>
              <div className="label-value">{editcomplain?.catagory1} </div>
            </div>
            <div className="label">
              <div className="label-key">Catagory 2 :</div>
              <div className="label-value">{editcomplain?.catagory2} </div>
            </div>
            <hr></hr>
            <div className="label">
              <div className="label-key">Mobile :</div>
              <div className="label-value">{editcomplain?.phone}</div>
            </div>
            <div className="label">
              <div className="label-key">Address :</div>
              <div className="label-value">{editcomplain?.address} </div>
            </div>
            <hr></hr>
            <div className="label">
              <div className="label-key">Request Started :</div>
              <div className="label-value">
                {new Date(editcomplain?.createdAt).toLocaleString()}{' '}
              </div>
            </div>
            <div className="label">
              <div className="label-key">Request Updated :</div>
              <div className="label-value">
                {new Date(editcomplain?.updatedAt).toLocaleString()}
              </div>
            </div>
            <div className="label">
              <div className="label-key">First Response by :</div>
              <div className="label-value">{editcomplain?.created_by}</div>
            </div>
          </div>
            <button className="complainbtn" onClick={() => setEdit(true)}>
              Edit
            </button>
          
        </>
      )}
    </div>
  );
};

export default EditComplain;
