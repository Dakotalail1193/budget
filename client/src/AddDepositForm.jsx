import React, { useState } from 'react'

function AddDepositForm(props){
    const initInputs = { title: props.title || "",
                         description: props.description || "",
                         deposit: props.deposit || "",
    }

        const [inputs, setInputs] = useState(initInputs)

        function handleChange(e){
            const { name, value } = e.target 
            setInputs(prevInput =>({...prevInput, [name]: value}))
        }

        function handleSubmit(e){
            e.preventDefault()
            props.submit(inputs, props._id)
            setInputs(initInputs)
        }
        
        return (
            <>
                <form onSubmit={handleSubmit}>
                    <input type = "text" name = "title" value={inputs.title} onChange={handleChange} placeholder='Title'/>
                    <input type = "text" name = "description" value={inputs.description} onChange={handleChange} placeholder='Description'/>
                    <input type = "number" name = "deposit" value={inputs.deposit} onChange={handleChange} placeholder='0'/>
                    <button>{props.btnText}</button>
                </form>
            </>
        )
}

export default AddDepositForm