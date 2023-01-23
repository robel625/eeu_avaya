import './sidebar.css';
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {

  const { auth, theme } = useSelector((state) => state);

  const navLinks = [
    { label: 'Home', icon: 'home', path: '/dashboard' },
    { label: 'Customer', icon: 'search', path: '/customer' },
    { label: 'complain', icon: 'document-outline', path: '/complain' },
    //{ label: 'fb', icon: 'logo-facebook', path: '/' },
    // { label: 'Message', icon: 'messenger', path: '/message' },
    { label: 'Message', icon: 'chatbubble-outline', path: '/message' },
    //{ label: 'Discover', icon: 'explore', path: '/discover' },
    { label: 'Group', icon: 'people', path: '/groupmessage' },
  ];

  const { toggle } = useSelector((state) => state);

  const { pathname } = useLocation();

  const isActive = (pn) => {
    if (pn === pathname) return 'hovered';
  };

  // useEffect(() => {
  //   let list = document.querySelectorAll('.navigation li');

  //   function activeLink() {
  //     list.forEach((item) => {
  //       item.classList.remove('hovered');
  //     });
  //     this.classList.add('hovered');

  //   }

  //   list.forEach((item) => item.addEventListener('mouseover', activeLink));
  // }, []);
  return (
    <div class={`navigation ${toggle ? 'active' : ''}`}>
      <ul>
        
        <li >
          <a href="#" >
              <img className='' src="eeuLogo.png"
            alt=""  width= '50' height= '50'
            style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
            />
            <span class="title">EEU</span>
          </a>
        </li>

        {navLinks.map((link, index) => (
          <li key={index} className={`${(isActive(link.path))?'hovered':''}`}>
            <Link to={link.path}>
              {/* <span className="material-icons">{link.icon}</span> */}
              <span class="icon">
                <ion-icon name={link.icon}></ion-icon>
              </span>
              <span class="title">{link.label}</span>
            </Link>
          </li>
        ))}

        <li>
          <a href="#">
            <span class="icon">
              <ion-icon name="help-outline"></ion-icon>
            </span>
            <span class="title">Help</span>
          </a>
        </li>

        <li>
          <a href="#">
            <span class="icon">
              <ion-icon name="settings-outline"></ion-icon>
            </span>
            <span class="title">Settings</span>
          </a>
        </li>

        <li>
          <a href="#">
            <span class="icon">
              <ion-icon name="lock-closed-outline"></ion-icon>
            </span>
            <span class="title">Password</span>
          </a>
        </li>

        <li>
          <a href="#">
            <span class="icon">
              <ion-icon name="log-out-outline"></ion-icon>
            </span>
            <span class="title">Sign Out</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
