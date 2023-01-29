import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { getCustomer } from '../../redux/actions/eeuAction';
import LoadIcon from '../../images/loading.gif';
import ComplainLeft from '../../components/eeu/ComplainLeft';
import ComplainRight from '../../components/eeu/ComplainRight';
import { Link } from 'react-router-dom';
import FrontPaginate from "../../components/eeu/FrontPaginate";

const ComplainbyId = () => {
  const { id } = useParams();

  const { eeu, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (eeu.customer._id !== id) {
      dispatch(getCustomer({ id, auth }));
    }
  }, [id, auth, dispatch]);

  console.log("eeu.complain",eeu.complain)

  const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentComplain = eeu.complain && eeu.complain.slice(indexOfFirstPost, indexOfLastPost);
  
  
    const paginate = pageNumber => setCurrentPage(pageNumber);



  return (
    <div>
      {eeu.loading ? (
        <img className="d-block mx-auto" src={LoadIcon} alt="loading" />
      ) : (
        <>
          <div className="complain">
            <ComplainLeft />
            <ComplainRight />
          </div>

          {(eeu.complain.length > 0) && <div className="mt-5">
          <table className="content-table">
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
                      {currentComplain.map((c) =>
                         <tr key={c._id}
                        //  className={`${c._id === complain._id ? "active-row":''}`}
                                                  >  
                         <Link to={`/complain/${c._id}`}>
                                <td>{c.id}</td>
                            </Link>
                            <td>{c.bp}</td>
                            <td>{c.customer.name}</td> 
                            <td>{c.rsg}</td>
                            <td>{c.catagory1}</td>
                            <td>{c.status}</td>
                            <td>{new Date(c.updatedAt).toLocaleString()}</td>
                            <Link to={`/complain/${c._id}`}>
                              <td>
                                 <button className="btnEdit">Edit</button>
                                </td>
                              </Link>
                            
                         </tr>
                         )}
                         
                      </tbody>
                    </table> 
                    <div className="paginate">
                      {(eeu.complain.length > 10) && <FrontPaginate postsPerPage={postsPerPage}
                        totalPosts={eeu.complain.length}
                        paginate={paginate}  />}
                    </div>
              </div>}
        </>
      )}
    </div>
  );
};

export default ComplainbyId;
