import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../redux/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const initialState = { username: '', password: '' };
  const [userData, setUserData] = useState(initialState);
  const { username, password } = userData;

  const [typePass, setTypePass] = useState(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (auth.token) history.push('/');
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <h3 className="text-uppercase text-center mb-4">904</h3>

        <div className="form-group">
          <label htmlFor="exampleInputusername1">Agent ID</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputusername1"
            name="username"
            aria-describedby="usernameHelp"
            onChange={handleChangeInput}
            value={username}
          />

          <small id="usernameHelp" className="form-text text-muted">
            example  rg00574323
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>

          <div className="pass">
            <input
              type={typePass ? 'text' : 'password'}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              value={password}
              name="password"
            />

            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? 'Hide' : 'Show'}
            </small>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-dark w-100"
          disabled={username && password ? false : true}
        >
          Login
        </button>

        <p className="my-2">
          If You lost  your password.{'   '}
          {/* <Link to="/register" style={{ color: 'crimson' }}>
            Register Now
          </Link> */}
          contact the admin
        </p>
      </form>
    </div>
  );
};

export default Login;
