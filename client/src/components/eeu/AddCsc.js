import React from 'react'
import Backdrop from './Backdrop'
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCsc } from '../../redux/actions/eeuAction';

function AddCsc({setCscPop}) {

  const dispatch = useDispatch();

  const { auth, theme } = useSelector((state) => state);
     
    const initialState = {
        region:'',
        district:'',
        csc:'',
        rsg:'',
        fullname: '',
        Agent_Id:'',
        phone: '',
        email: '',
        gender: 'male',
      };
      const [cscData, setcscData] = useState(initialState);
      const { region, district,csc,rsg, fullname,Agent_Id, phone, email} = cscData;

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setcscData({ ...cscData, [name]: value });
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addCsc(cscData,auth));
        console.log('cscData', cscData );
      };

  return (
    <div>
        <Backdrop>
       <div className='addCustomerContainer'>
         <div className="addCwrapper">
            <h4 className="text-xl">Add Customer</h4>
            <IconButton onClick={() => setCscPop(false)} >
              <CloseRoundedIcon className="addCRemove" />
            </IconButton>
          </div>


      <div className="formcustomer">
        <form onSubmit={handleSubmit}>
        
        <div className="form-Item">
        <div className="form-key">Region :</div>
          <input
            type="text"
            className="form-control"
            id="region"
            name="region"
            placeholder="Region"
            onChange={handleChangeInput}
            value={region}
          />
        </div>

        <div className="form-Item">
        <div className="form-key">District :</div>
          <input
            type="text"
            className="form-control"
            id="district"
            name="district"
            placeholder="District"
            onChange={handleChangeInput}
            value={district}
          />
        </div>

        <div className="form-Item">
        <div className="form-key">CSC :</div>
          <input
            type="text"
            className="form-control"
            id="csc"
            name="csc"
            placeholder="Customer Service Centers"
            onChange={handleChangeInput}
            value={csc}
          />
        </div>

        <div className="form-Item">
        <div className="form-key">RSG :</div>
          <input
            type="text"
            className="form-control"
            id="rsg"
            name="rsg"
            placeholder="RSG"
            onChange={handleChangeInput}
            value={rsg}
          />
        </div>
               
        <div className="form-Item">
        <div className="form-key">Full Name :</div>
          <input
            type="text"
            className="form-control"
            id="fullname"
            name="fullname"
            placeholder="Responsble Full Name"
            onChange={handleChangeInput}
            value={fullname}
          />

        </div>

        <div className="form-Item">
        <div className="form-key">Agent_Id :</div>
          <input
            type="text"
            className="form-control"
            id="Agent_Id"
            name="Agent_Id"
            placeholder="Agent_Id"
            onChange={handleChangeInput}
            value={Agent_Id}
          />

        </div>

        <div className="form-Item">
        <div className="form-key">Phone :</div>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            placeholder="Responsble Phone"
            onChange={handleChangeInput}
            value={phone}
          />
        </div>

        <div className="form-Item">
        <div className="form-key">Email :</div>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            placeholder="Responsble Email address"
            onChange={handleChangeInput}
            value={email}
          />
        </div>


        <div className="row justify-content-around mx-0 mb-1">
          <label htmlFor="male">
            Male:{' '}
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              defaultChecked
              onChange={handleChangeInput}
            />
          </label>

          <label htmlFor="female">
            Female:{' '}
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onChange={handleChangeInput}
            />
          </label>
        </div>

        <button type="submit" className="btn btn-dark w-100">
          ADD
        </button>
      </form>
      </div>
    </div>
    
    </Backdrop >
    </div>
  )
}

export default AddCsc
