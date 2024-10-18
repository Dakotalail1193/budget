import React, {useEffect, useState} from 'react'
import axios from 'axios'
const Context = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})


function ContextProvider(props){
    const initState ={
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || "",
        deposit:[],
        withdrawal:[],
        errMsg: ""
    }
    const [deposit, setDeposit] = useState([])
    const [withdrawal, setWithdrawal] = useState([])
    const [userState, setUserState] = useState(initState)


    async function signup(creds){
        try {
            const res = await axios.post('/api/auth/signup', creds)
            const {user, token} = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            setUserState(prevUserState =>{
                return {
                    ...prevUserState,
                    user:user,
                    token:token
                }
            })
        } catch (error) {
            handleAuthErr(error.response.data.errMsg)
        }
    }

    async function login(creds){
        try {
            const res = await axios.post('api/auth/login', creds)
            const {user, token} = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            setUserState(prevUserState =>{
                return {
                    ...prevUserState,
                    user:user,
                    token:token
                }
            })
        } catch (error) {
            handleAuthErr(error.response.data.errMsg)
        }
    }

    async function logout(){
        try {
           localStorage.removeItem("user")
           localStorage.removeItem("token")
           setUserState(prevUserState => {
            return {
                ...prevUserState,
                token: "",
                user:{}
            }
           }) 
        } catch (error) {
            console.log(error)
        }
    }

    function handleAuthErr(errMsg){
        setUserState(prevUserState => {
            return {
                ...prevUserState,
                errMsg
            }
        })
    }

    function resetAuthErr(){
        setUserState(prevUserState => {
            return {
                ...prevUserState,
                errMsg: ""
            }
        })
    }

function getDeposit(){
    userAxios.get("/api/main/deposit")
    .then(res => setDeposit(res.data))
    
    .catch(err => console.log(err))
}

function getWithdrawal(){
    userAxios.get("/api/main/withdrawal")
    .then(res => setWithdrawal(res.data))
    .catch(err => console.log(err))
}

function addDeposit(newDeposit){
    userAxios.post("/api/main/deposit", newDeposit)
    .then(res => {setDeposit(prevDeposit => [...prevDeposit, res.data])})
    .catch(err => console.log(err))
}

function addWithdrawal(newWithdrawal){
    userAxios.post("/api/main/withdrawal", newWithdrawal)
     .then(res =>{setWithdrawal(prevWithdrawal => [...prevWithdrawal, res.data])})
    .catch(err => console.log(err))
}

function deleteDeposit(depositId){
    userAxios.delete(`/api/main/deposit/${depositId}`)
    .then(res => {setDeposit(prevDeposit => prevDeposit.filter (deposit => deposit._id !== depositId))})
    .catch(err => console.log(err))
}

function deleteWithdrawal(withdrawalId){
    userAxios.delete(`/api/main/withdrawal/${withdrawalId}`)
    .then(res => {setWithdrawal(prevWithdrawal => prevWithdrawal.filter (withdrawal => withdrawal._id !== withdrawalId))})
    .catch(err => console.log(err))
}

function editDeposit(updates, depositId){
    userAxios.put(`/api/main/deposit/${depositId}`, updates)
    .then(res => {
        setDeposit(prevDeposit => prevDeposit.map (deposit => deposit._id !== depositId ? deposit : res.data))
    })
    .catch(err => console.log(err))
}

function editWithdrawal(updates, withdrawalId){
    userAxios.put(`/api/main/withdrawal/${withdrawalId}`, updates)
    .then(res => {
        setWithdrawal(prevWithdrawal => prevWithdrawal.map (withdrawal => withdrawal._id !== withdrawalId ? withdrawal : res.data))
    })
    .catch(err => console.log(err))
}


useEffect(  () => {
    getWithdrawal()
    withdrawalTotal()
}, [])

async function withdrawalTotal(){
    try {
        let total
        const sum = await Promise.all(withdrawal.map( item => item.withdrawal += total))
        console.log(withdrawal)
        return sum
    } catch (error) {
        console.log(error)
    }
            
    }

    console.log(userState.user)

    return (
        <>
        <Context.Provider value = {{
            ...userState,
            signup,
            login,
            logout,
            handleAuthErr,
            resetAuthErr,
            getDeposit,
            getWithdrawal,
            addDeposit,
            addWithdrawal,
            deleteDeposit,
            deleteWithdrawal,
            deposit,
            setDeposit,
            withdrawal,
            setWithdrawal,
            editDeposit,
            editWithdrawal,
            withdrawalTotal
        }}>
            {props.children}
        </Context.Provider>
        </>
    )


}
export {Context, ContextProvider}