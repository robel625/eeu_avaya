import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { createComplain } from '../../redux/actions/eeuAction';
import RightSide from '../groupmessage/RightSide';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '../Avatar';
import { Link } from 'react-router-dom';

const ComplainRight = () => {
  const { eeu, auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [complain, setComplain] = useState('');
  const [customer, setCustomer] = useState('');

  console.log('eeu.customer.responsbile', customer);

  useEffect(() => {
    setComplain(eeu.complain);
    setCustomer(eeu.customer);
  }, [eeu.complain]);

  console.log(complain);

  var cars = eeu.complain,
    //var cars = [{ make: 'audi', model: 'r8', year: '2012' }, { make: 'audi', model: 'rs5', year: '2013' }, { make: 'ford', model: 'mustang', year: '2012' }, { make: 'ford', model: 'fusion', year: '2015' }, { make: 'kia', model: 'optima', year: '2012' }],
    result = cars.reduce(function (r, a) {
      r[a.status] = r[a.status] || [];
      r[a.status].push(a);
      return r;
    }, Object.create(null));

  console.log('resultcar', result);

  return (
    <div className="complainRight">
      <div className="label">
        <div className="label-key">Full Name :</div>
        <div className="label-value">{eeu.customer?.name}</div>
      </div>
      <div className="label">
        <div className="label-key">phone :</div>
        <div className="label-value">{eeu.customer?.phone}</div>
      </div>
      <div className="label">
        <div className="label-key">Email :</div>
        <div className="label-value">{eeu.customer?.Email}</div>
      </div>
      <div className="label">
        <div className="label-key">address :</div>
        <div className="label-value">{eeu.customer?.address}</div>
      </div>
      <hr></hr>
      <div className="label">
        <div className="label-key">bp :</div>
        <div className="label-value">{eeu.customer?.bp}</div>
      </div>
      <div className="label">
        <div className="label-key">district :</div>
        <div className="label-value">{eeu.customer?.district}</div>
      </div>
      <div className="label">
        <div className="label-key">csc :</div>
        <div className="label-value">{eeu.customer?.csc}</div>
      </div>
      <div className="label">
        <div className="label-key">rsg :</div>
        <div className="label-value">{eeu.customer?.rsg}</div>
      </div>

      <div className="">
        <div className="responsbile-title">Employee :</div>
        <div className="responsble1 ">
          {customer?.responsbile?.map((r) => (
            <div className="responsble2 ">
              <div>
                {/* <Link
                  to={`/profile/${r._id}`} 
                  className="d-flex align-items-center"
                > */}
                 <div className="d-flex align-items-center">
                  <Link to={`/profile/${r._id}`} >
                  <Avatar src={r.avatar} size="big-avatar" />
                  </Link>

                  <div
                    className="ml-1"
                    style={{ transform: 'translateY(-2px)' }}
                  >
                    <span className="r-name d-block">{r.username}</span>

                    <small className="r-name" style={{ opacity: 0.7 }}>
                      {r.fullname}
                    </small>
                  </div>
                  </div>
                {/* </Link> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComplainRight;

{
  /* <div className="label">
                      <div className="label-key">Full Name :</div>
                      <div className="label-value">{r?.fullname}</div>
                    </div>
                    <div className="label">
                      <div className="label-key">username :</div>
                      <div className="label-value">{r?.username}</div>
                    </div>
                    <div className="label">
                      <div className="label-key">Mobile :</div>
                      <div className="label-value">{eeu.customer.respnsbie?.phone}</div>
                    </div>
                    <div className="label">
                      <div className="label-key">District :</div>
                      <div className="label-value">{eeu.customer.respnsbie?.district}</div>
                    </div>
                    <div className="label">
                      <div className="label-key">csc :</div>
                      <div className="label-value">{eeu.customer.respnsbie?.csc}</div>
                    </div>
                    <div className="label">
                      <div className="label-key">rsg :</div>
                      <div className="label-value">{eeu.customer.respnsbie?.rsg}</div>
                    </div> */
}
