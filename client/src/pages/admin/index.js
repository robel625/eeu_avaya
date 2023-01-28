import { useEffect, useState } from 'react';
import AddUser from '../../components/eeu/AddUser';
import AddCsc from '../../components/eeu/AddCsc';
import { useSelector, useDispatch } from 'react-redux';
import { getDataAPI, patchDataAPI } from '../../utils/fetchData';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import LoadIcon from '../../images/loading.gif';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../../redux/actions/eeuAction';
import FrontPaginate from "../../components/eeu/FrontPaginate";

const Users = () => {

 const { eeu, auth } = useSelector((state) => state);

 const dispatch = useDispatch();

  const [close, setClose] = useState(true);
  const [addUser, setAddUser] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const [search, setSearch] = useState([]);
  const [users, setUsers] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    dispatch(getAllUsers({ auth }));
  }, [auth]);

  useEffect(() => {
    setUsers(eeu?.users)
  }, [eeu?.users]);

  const handleAdduser = async (e) => {
    e.preventDefault();
    setAddUser(true);
    setEditPop(true);
  };


  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentUsers = users && users.slice(indexOfFirstPost, indexOfLastPost);


  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
        
        {editPop && (
            <AddUser
            setEditPop={setEditPop}
            setAddUser={setAddUser}
            user={user}
            addUser={addUser}
            />
          )}

 {(auth.user.role === 'admin') && <button
                      className="btnEdit"
                      onClick={handleAdduser}
                    >
                      Add user
                    </button>}
          

        <div className="">
        <table className="content-table">
          <thead className="">
            <tr>
              <th className="">Id</th>
              <th className="">Name</th>
              <td className="">role</td>
              <th className="">Phone</th>
              <th className="">district</th>
              <th className="">csc</th>
              <th className="">rsg</th>
              <th className="">Action</th>
            </tr>
          </thead>
          <tbody className="">
          { (auth.user.role === 'admin') && currentUsers &&
               currentUsers.map((c) => (
                <tr
                  key={c._id}
                  onClick={() => setUser(c)}
                //   className={`${c._id === customer._id ? 'active-row' : ''}`}
                >
                  <td>{c.username}</td>
                  <td>{c.fullname}</td>
                  <td>{c.role}</td>
                  <td>{c.mobile}</td>
                  <td>{c.district}</td>
                  <td>{c.csc}</td>
                  <td>{c.rsg}</td>
                  <td>
                    <button
                      className="btnEdit"
                      onClick={() => setEditPop(true) }
                    >
                      Edit
                    </button>
                    <button className="btnRemove">Remove</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="paginate">
        {(users.length > 10) && <FrontPaginate postsPerPage={postsPerPage}
                        totalPosts={users.length}
                        paginate={paginate}  />}
          </div>
      </div>
    </div>
  )
}

export default Users
