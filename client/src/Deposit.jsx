import React, {useContext, useState} from 'react'
import { Context } from './ContextProvider/Context'
import AddDepositForm from './AddDepositForm'

function Deposit(props){
    const {title, description, deposit, _id} = props
    const {deleteDeposit, editDeposit} = useContext(Context)
    const [editToggle, setEditToggle] = useState(false)

    return(
        <>
        <div className='deposit'>
            {!editToggle ?
            <>
            <h2>Title: {title}</h2>
            <h2>Description:{description}</h2>
            <h2>Deposit Amount: ${deposit} </h2>
            <button className='delete-btn'
            onClick={() => {deleteDeposit(props._id)}}>Delete</button>
            <button className='edit-btn'
            onClick={() => setEditToggle(prevToggle => !prevToggle)}>Edit</button>
            </>
            :
            <>
            <AddDepositForm
            title={title}
            description={description}
            deposit={deposit}
            _id={_id}
            btnText="Submit Edit"
            submit={editDeposit}/>
            <button 
            className='edit-btn'
            onClick={() => setEditToggle(prevToggle => !prevToggle)}
            >Close</button>            
            </>
        }
        </div>
        </>
    )
}

export default Deposit