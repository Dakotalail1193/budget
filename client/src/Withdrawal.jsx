import React, {useContext, useState} from 'react'
import { Context } from './ContextProvider/Context'
import AddWithdrawalForm from './AddWithdrawalForm'

function Withdrawal(props){
    const {title, description, withdrawal, _id} = props
    const {deleteWithdrawal, editWithdrawal} = useContext(Context)
    const [editToggle, setEditToggle] = useState(false)

    return(
        <>
        <div className='withdrawal'>
            {!editToggle ?
            <>
            <h2>Title: {title}</h2>
            <h2>Description:{description}</h2>
            <h2>Withdrawal Amount: ${withdrawal} </h2>
            <button className='delete-btn'
            onClick={() => {deleteWithdrawal(props._id)}}>Delete</button>
            <button className='edit-btn'
            onClick={() => setEditToggle(prevToggle => !prevToggle)}>Edit</button>
            </>
            :
            <>
            <AddWithdrawalForm
            title={title}
            description={description}
            withdrawal={withdrawal}
            _id={_id}
            btnText="Submit Edit"
            submit={editWithdrawal}/>
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

export default Withdrawal