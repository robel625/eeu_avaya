import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import Search from './Search';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { useSelector, useDispatch } from 'react-redux';

const Header = () => {
  const { auth, theme,notify, toggle } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className={`header ${toggle ? 'active' : ''}`}>
      <nav
        className="navbar navbar-expand-lg navbar-light 
             justify-content-between align-middle"
      >
        {/* <Link to="/" className="logo">
          <h1
            className="navbar-brand text-uppercase p-0 m-0"
            onClick={() => window.scrollTo({ top: 0 })}
          >
            904
            {<p>
              {' '}
              E : <b>{process.env.NODE_ENV}</b>
            </p> }
          </h1>
        </Link> */}

        <div
          class="toggle"
          onClick={() =>
            dispatch({
              type: GLOBALTYPES.TOGGLE,
              payload: !toggle,
            })
          }
        >
          <ion-icon name="menu-outline"></ion-icon>
        </div>

        <Search />

        <Menu />
      </nav>
    </div>
  );
};

export default Header;
