import React from 'react'
import Backdrop from './Backdrop'
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCustomer, updateCustomer } from '../../redux/actions/eeuAction';

function AddCustomer({setCreateCustomerPop, customer}) {

  const dispatch = useDispatch();

  const { auth, theme } = useSelector((state) => state);
     
    const initialState = {
        bp: '',
        region: '',
        district: '',
        csc: '',
        rsg: '',
        name: '',
        phone: '',
        email: '',
        address: '',
        gender: '',
      };
      const [customerData, setcustomerData] = useState(initialState);
      const { bp, region, district,csc,rsg, name, phone, email, address } = customerData;

      useEffect(() => {
        setcustomerData(customer);
      }, [customer]);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setcustomerData({ ...customerData, [name]: value });
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        //dispatch(addCustomer(customerData,auth));
        dispatch(updateCustomer(customerData,auth));
        console.log('customerData', customerData );
      };

  return (
    <div>
        <Backdrop>
       <div className='addCustomerContainer'>
         <div className="addCwrapper">
            <h4 className="text-xl">Add Customer</h4>
            <IconButton onClick={() => setCreateCustomerPop(false)} >
              <CloseRoundedIcon className="addCRemove" />
            </IconButton>
          </div>


      <div className="formcustomer">
        <form onSubmit={handleSubmit}>

        <div className="form-Item">
        <div className="form-key">BP :</div>
          <input
            type="text"
            className="form-control"
            id="bp"
            name="bp"
            onChange={handleChangeInput}
            value={bp}
          />

        </div>

        <div className="form-Item">
        <div className="form-key">Region :</div>
          <input
            type="text"
            className="form-control"
            id="region"
            name="region"
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
            onChange={handleChangeInput}
            value={district}
          />
        </div>

        <div className="form-Item">
        <div className="form-key">CSC</div>
          <input
            type="text"
            className="form-control"
            id="csc"
            name="csc"
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
            onChange={handleChangeInput}
            value={email}
          />
        </div>

        <div className="form-Item">
        <div className="form-key">Address :</div>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            placeholder="Address"
            onChange={handleChangeInput}
            value={address}
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
          save
        </button>
      </form>
      </div>
    </div>
    
    </Backdrop >
    </div>
  )
}

export default AddCustomer
