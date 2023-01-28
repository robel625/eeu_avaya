import React from 'react';
import Backdrop from './Backdrop';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser1, updateUser1 } from '../../redux/actions/eeuAction';

function AddUser({ setEditPop,setAddUser, user, addUser }) {
  const dispatch = useDispatch();

  const { eeu, auth, theme } = useSelector((state) => state);

  const initialState = {
    fullname: '',
    username: '',
    mobile: '',
    email: '',
    address: '',
    password: '',
    role: '',
    region: '',
    district: '',
    csc: '',
    rsg: '',
  };
  const [userData, setUserData] = useState(initialState);
  const {fullname, username, role, rsg, password, mobile, email, address, region, district, csc } = userData;

  useEffect(() => {
    if (!addUser) {
      setUserData(user);
    }
  }, [user]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addUser) {
      dispatch(addUser1(userData, auth));
    } else {
      dispatch(updateUser1(userData, auth));
    }

    console.log('userData', userData);
  };

  const handleclose = async (e) => {
    e.preventDefault();
    setAddUser(false);
    setEditPop(false);
  };

  return (
    <div>
      <Backdrop>
        <div className="addCustomerContainer">
          <div className="addCwrapper">
            <h4 className="text-xl">Edit User</h4>
            <IconButton onClick={handleclose}>
              <CloseRoundedIcon className="addCRemove" />
            </IconButton>
          </div>

          <div className="formcustomer">
            <form onSubmit={handleSubmit}>
              <div className="form-Item">
                <div className="form-key">username :</div>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  onChange={handleChangeInput}
                  value={username}
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
                  value={fullname}
                />
              </div>

              <div className="form-Item">
                <div className="form-key">Mobile :</div>
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  name="mobile"
                  onChange={handleChangeInput}
                  value={mobile}
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
                  onChange={handleChangeInput}
                  value={address}
                />
              </div>

              <div className="form-Item">
                <div className="form-key">role :</div>
                <input
                  type="text"
                  className="form-control"
                  id="role"
                  name="role"
                  onChange={handleChangeInput}
                  value={role}
                />
              </div>

              <div className="form-Item">
                <div className="form-key">password :</div>
                <input
                  type="text"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={handleChangeInput}
                  value={password}
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
                <div className="form-key">region</div>
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
                <div className="form-key">district :</div>
                <input
                  type="text"
                  className="form-control"
                  id="district"
                  name="district"
                  onChange={handleChangeInput}
                  value={district}
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
      </Backdrop>
    </div>
  );
}

export default AddUser;
