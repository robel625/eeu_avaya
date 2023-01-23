import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkImage } from '../../utils/imageUpload';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { updateProfilePassword } from '../../redux/actions/profileAction';

const ChangePassword = ({ setOnEdit1 }) => {
  const initState = {
    oldpassword:'',
    newpassword:'',
    cf_password:'',
  };
  const [userData, setUserData] = useState(initState);
  const { oldpassword, newpassword, cf_password } = userData;

  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [typeoPass, setTypeoPass] = useState(false);
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

    const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfilePassword({ userData, auth }));
    console.log("userDatatyp",userData.type)
  };


  return (
    <div className="edit_profile">
      <button
        className="btn btn-danger btn_close"
        onClick={() => setOnEdit1(false)}
      >
        Close
      </button>

      <form onSubmit={handleSubmit}>

      <div className="form-group">
          <label htmlFor="exampleInputPassword1">Old Password</label>

          <div className="pass">
            <input
              type={typeoPass ? 'text' : 'password'}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleInput}
              value={oldpassword}
              name="oldpassword"
              style={{ background: `${alert.password ? '#fd2d6a14' : ''}` }}
            />

            <small onClick={() => setTypeoPass(!typeoPass)}>
              {typeoPass ? 'Hide' : 'Show'}
            </small>
          </div>

          <small className="form-text text-danger">
            {alert.password ? alert.password : ''}
          </small>
        </div>
        
      <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>

          <div className="pass">
            <input
              type={typePass ? 'text' : 'password'}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleInput}
              value={newpassword}
              name="newpassword"
              style={{ background: `${alert.password ? '#fd2d6a14' : ''}` }}
            />

            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? 'Hide' : 'Show'}
            </small>
          </div>

          <small className="form-text text-danger">
            {alert.password ? alert.password : ''}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="cf_password">Confirm Password</label>

          <div className="pass">
            <input
              type={typeCfPass ? 'text' : 'password'}
              className="form-control"
              id="cf_password"
              onChange={handleInput}
              value={cf_password}
              name="cf_password"
              style={{ background: `${alert.cf_password ? '#fd2d6a14' : ''}` }}
            />

            <small onClick={() => setTypeCfPass(!typeCfPass)}>
              {typeCfPass ? 'Hide' : 'Show'}
            </small>
          </div>

          <small className="form-text text-danger">
            {alert.cf_password ? alert.cf_password : ''}
          </small>
        </div>

        <button className="btn btn-info w-100" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
