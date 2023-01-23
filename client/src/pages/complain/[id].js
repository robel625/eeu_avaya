import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { getCustomer } from '../../redux/actions/eeuAction'
import LoadIcon from '../../images/loading.gif'
import EditComplain from '../../components/eeu/EditComplain'
import ChatComplain from '../../components/eeu/ChatComplain'
import { getDataAPI, patchDataAPI  } from '../../utils/fetchData'

const ShowComplain = () =>  {
    const { id } = useParams()
    console.log("complainid",id)
    
    const [complain, setComplain] = useState('')

    const { eeu, auth } = useSelector(state => state)
    const dispatch = useDispatch()
    
    useEffect(() => {
      const fetchData = async () => {
        const res = await getDataAPI(`/complain/requestId/${id}`, auth.token);
        console.log('editcomplian', res.data.complain[0])
        setComplain(res.data.complain[0])
      }
      fetchData()
    }, [id,auth])

    console.log('editID', complain)

  return (
    <div>
        { eeu.loading 
                ? <img className="d-block mx-auto" src={LoadIcon} alt="loading" />
                : <>
    <div className="complain" >
          <EditComplain   complain={complain} />
         <ChatComplain/>
    </div>
    </>}
    </div>
  )
}

export default ShowComplain