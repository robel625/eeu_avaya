import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { getCustomer } from '../../redux/actions/eeuAction'
import LoadIcon from '../../images/loading.gif'
import ComplainLeft from '../../components/eeu/ComplainLeft'
import ComplainRight from '../../components/eeu/ComplainRight'

const ComplainbyId = () =>  {
    const { id } = useParams()
    

    const { eeu, auth } = useSelector(state => state)
    const dispatch = useDispatch()
    
    useEffect(() => {
        if(eeu.customer._id !== id){
            dispatch(getCustomer({id, auth}))
        }
    },[id, auth, dispatch])

    


  return (
    <div>
    { eeu.loading 
                ? <img className="d-block mx-auto" src={LoadIcon} alt="loading" />
                : <>
    <div className="complain" >
         <ComplainLeft/>
         <ComplainRight/>
    </div>
    </>}
    </div>
  )
}

export default ComplainbyId