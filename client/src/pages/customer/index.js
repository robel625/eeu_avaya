import './customer.css';
import CustomerTop from "../../components/eeu/CustomerTop";
import { useEffect, useState } from 'react';
import AddCustomer from '../../components/eeu/AddCustomer';
import FrontPaginate from "../../components/eeu/FrontPaginate";

const Customer = () => {
  const [createCustomerPop, setCreateCustomerPop] = useState(false);
  const [search, setSearch] = useState([]);
  const [customer, setCustomer] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentSearch = search && search.slice(indexOfFirstPost, indexOfLastPost);


  const paginate = pageNumber => setCurrentPage(pageNumber);
  

  return (
    <div>
        <CustomerTop setSearch={setSearch}   setCustomer={setCustomer} customer={customer}/>
        
        {createCustomerPop && (
            <AddCustomer
              setCreateCustomerPop={setCreateCustomerPop}
              customer={customer}
            />
          )}

        <div className="">
        <table className="content-table">
          <thead className="">
            <tr>
              <th className="">bp</th>
              <th className="">Name</th>
              <th className="">Phone</th>
              <th className="">district</th>
              <th className="">csc</th>
              <th className="">rsg</th>
              <th className="">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {currentSearch &&
              currentSearch.map((c) => (
                <tr
                  key={c._id}
                  onClick={() => setCustomer(c)}
                  className={`${c._id === customer._id ? 'active-row' : ''}`}
                  //className="active-row"
                  //style={{ background: c._id === customer._id ? "active-row" : "" }}
                >
                  <td>{c.bp}</td>
                  <td>{c.name}</td>
                  <td>{c.phone}</td>
                  <td>{c.district}</td>
                  <td>{c.csc}</td>
                  <td>{c.rsg}</td>
                  <td>
                    <button
                      className="btnEdit"
                      onClick={() => setCreateCustomerPop(true)}
                    >
                      Edit
                    </button>
                    {/* <button className="btnRemove">Remove</button> */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="paginate">
        {(search.length > 10) && <FrontPaginate postsPerPage={postsPerPage}
                        totalPosts={search.length}
                        paginate={paginate}  />}
          </div>
      </div>
    </div>
  );
};

export default Customer;
