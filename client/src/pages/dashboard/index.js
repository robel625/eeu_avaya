import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getComplainbyAgent } from '../../redux/actions/eeuAction';
import { Link } from 'react-router-dom';
import './dashboard.css';
import FrontPaginate from "../../components/eeu/FrontPaginate";

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [complain, setComplain] = useState([]);
  const [status, setStatus] = useState([]);

  const { eeu, auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData(auth.user);
    dispatch(getComplainbyAgent({ auth }));
  }, [auth]);

  useEffect(() => {
    var cars = eeu.complainAgent;
    //var cars = [{ make: 'audi', model: 'r8', year: '2012' }, { make: 'audi', model: 'rs5', year: '2013' }, { make: 'ford', model: 'mustang', year: '2012' }, { make: 'ford', model: 'fusion', year: '2015' }, { make: 'kia', model: 'optima', year: '2012' }],
    var result = cars.reduce(function (r, a) {
      r[a.status] = r[a.status] || [];
      r[a.status].push(a);
      return r;
    }, Object.create(null));
    setComplain(result);
  }, [eeu]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentStatus = status && status.slice(indexOfFirstPost, indexOfLastPost);


  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='home'>
      <h3 className='username'>{userData.username}</h3>

      <div class="cardBox">
        <div class="card1" onClick={() => setStatus(complain.new)}>
          <div>
            <div class="numbers">{complain?.new?.length || 0}</div>
            <div class="cardName">NEW</div>
          </div>

          <div class="iconBx">
            <ion-icon name="attach-outline"></ion-icon>
          </div>
        </div>

        <div
          class="card1"
          onClick={() => setStatus(complain['Dispatcher Required'])}
        >
          <div>
            <div class="numbers">
              {complain['Dispatcher Required']?.length || 0}
            </div>
            <div class="cardName">Dispatcher Required</div>
          </div>

          <div class="iconBx">
            <ion-icon name="person-outline"></ion-icon>
          </div>
        </div>

        <div class="card1" onClick={() => setStatus(complain['In Progress'])}>
          <div>
            <div class="numbers">{complain['In Progress']?.length || 0}</div>
            <div class="cardName">In Progress</div>
          </div>

          <div class="iconBx">
            <ion-icon name="rocket-outline"></ion-icon>
          </div>
        </div>

        <div class="card1" onClick={() => setStatus(complain['Process Completed'])}>
          <div>
            <div class="numbers">{complain['Process Completed']?.length || 0}</div>
            <div class="cardName">Process Completed</div>
          </div>

          <div class="iconBx">
            <ion-icon name="cash-outline"></ion-icon>
          </div>
        </div>
      </div>
      

      <div className="details">
        <div class="recentOrders">
          <div class="cardHeader">
            <h2>Recent Orders</h2>
            <a href="#" class="btn" onClick={() => setStatus(eeu.complainAgent)}>
              View All
            </a>
          </div>
          <table>
            <thead className="">
              <tr>
                <th className="">request id</th>
                <th className="">bp</th>
                <th className="">Name</th>
                <th className="">RSG</th>
                <th className="">Catagory</th>
                <th className="">Status</th>
                <th className="">Date</th>
                <th className="">Action</th>
              </tr>
            </thead>
            <tbody className="">
              {currentStatus &&
                currentStatus.map((c) => (
                  <tr
                    key={c._id}
                    className={`${c._id === complain._id ? 'active-row' : ''}`}
                  >
                    <Link to={`/complain/${c._id}`}>
                      <td>{c.id}</td>
                    </Link>
                    <td>{c.bp}</td>
                    <td>{c.customer_id.name}</td>
                    <td>{c.rsg}</td>
                    <td>{c.catagory1}</td>
                    <td><span class={`status ${c.status} `}>{c.status}</span></td>
                    <td>{new Date(c.updatedAt).toLocaleString()}</td>
                    <Link to={`/complain/${c._id}`}>
                      <td>
                        <button className="btnEdit">Edit</button>
                      </td>
                    </Link>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="paginate">
        {(status.length > 10) && <FrontPaginate postsPerPage={postsPerPage}
                        totalPosts={status.length}
                        paginate={paginate}  />}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
