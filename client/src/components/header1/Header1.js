import React from 'react';
import './header1.css';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../redux/actions/authAction';
import Avatar from '../Avatar';
import NotifyModal from '../NotifyModal';

const Header1 = () => {
  const { auth, theme,notify, toggle } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div class={`main2 ${toggle ? 'active' : ''} `}>
      <div class="topbar">
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

        <div class="search">
          <label>
            <input type="text" placeholder="Search here" />
            <ion-icon name="search-outline"></ion-icon>
          </label>
        </div>

        {/* <div class="user">
          <img
            src="https://www.nasa.gov/sites/default/files/styles/full_width/public/thumbnails/image/main_image_star-forming_region_carina_nircam_final-1280.jpg"
            alt=""
          />
        </div> */}

        <div className="navbar">
        <div className="menu">
          <ul className="navbar-nav flex-row">
          <li className="nav-item dropdown" style={{ opacity: 1 }}>
          <span
            className="nav-link position-relative"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span
              className="material-icons"
              style={{ color: notify.data.length > 0 ? 'crimson' : '' }}
            >
              favorite
            </span>

            <span className="notify_length">{notify.data.length}</span>
          </span>

          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdown"
            style={{ transform: 'translateX(75px)' }}
          >
            <NotifyModal />
          </div>
        </li>

            <li className="nav-item dropdown" style={{ opacity: 1 }}>
              <span
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <Avatar src={auth.user.avatar} size="medium-avatar" />
              </span>

              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link
                  className="dropdown-item"
                  to={`/profile/${auth.user._id}`}
                >
                  Profile
                </Link>

                <label
                  htmlFor="theme"
                  className="dropdown-item"
                  onClick={() =>
                    dispatch({
                      type: GLOBALTYPES.THEME,
                      payload: !theme,
                    })
                  }
                >
                  {theme ? 'Light mode' : 'Dark mode'}
                </label>

                <div className="dropdown-divider"></div>
                <Link
                  className="dropdown-item"
                  to="/"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </Link>
              </div>
            </li>
          </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header1;
