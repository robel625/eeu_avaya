import { useEffect, useState } from "react";
import AddCustomer from "../../components/eeu/AddCustomer";
import AddCsc from "../../components/eeu/AddCsc";
import { useSelector, useDispatch } from 'react-redux';
import { getDataAPI, patchDataAPI  } from '../../utils/fetchData'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import LoadIcon from '../../images/loading.gif'
import { Link } from 'react-router-dom'
import { updateCustomer } from '../../redux/actions/eeuAction';
import FrontPaginate from "../../components/eeu/FrontPaginate";

import SearchComplainLeft from '../../components/eeu/search/SearchComplainLeft'

const SearchComplain = () => {
    // const [close, setClose] = useState(true)
    // const [createCustomerPop, setCreateCustomerPop] = useState(false)
    // const [cscPop, setCscPop] = useState(false)
    const [search, setSearch] = useState([])
    const [complain, setComplain] = useState('')
    const [complaind, setComplaind] = useState('')
    
    const dispatch = useDispatch();

  const { auth, theme } = useSelector((state) => state);
    // const [load, setLoad] = useState(false)

    // useEffect(() => {
    //   async function fetchData(){
    //     const res = await getDataAPI(`/customerdetail/${customer._id}`, auth.token);
    //     setCustomerd(res.data.customer[0])
    //   }
    //   fetchData();
    // }, [customer]);

    const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentSearch = search && search.slice(indexOfFirstPost, indexOfLastPost);
  
    const paginate = pageNumber => setCurrentPage(pageNumber);
     
     
    return (
        <div>
          <div className="searchContainer">
          <SearchComplainLeft setComplain={setComplain} setSearch={setSearch}/>


            <div className="searchRight">complain</div>
            </div>


          <div className="">
                   <table className="content-table">
                      <thead className="">
                      <tr>
                      <th className="">request id</th>
                        <th className="">bp</th>
                        <th className="">Name</th>
                        <th className="">RSG</th>
                        <th className="">Responsible</th>
                        <th className="">Catagory</th>
                        <th className="">Status</th>
                        <th className="">Date</th>
                        <th className="">Action</th>
                      </tr>
                      </thead>
                      <tbody className="">
                      {currentSearch && currentSearch.map((c) =>
                         <tr key={c._id}
                         className={`${c._id === complain._id ? "active-row":''}`}
                                                  >  
                         <Link to={`/complain/${c._id}`}>
                                <td>{c.id}</td>
                            </Link>
                            <td>{c.bp}</td>
                            <td>{c.customer.name}</td>
                            <td>{c.rsg}</td>
                            <td>{c.responsible}</td>
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
        {(search.length > 10) && <FrontPaginate postsPerPage={postsPerPage}
                        totalPosts={search.length}
                        paginate={paginate}  />}
          </div>
                </div>

        </div>
    )
}

export default SearchComplain;