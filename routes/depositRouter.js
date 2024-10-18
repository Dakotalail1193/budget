const express = require ('express')
const depositRouter = express.Router()
const Deposit = require('../model/deposit')

depositRouter.get("/", async(req, res, next) => {
    try {
        const foundDeposit = await Deposit.find({userId: req.auth._id})        
        return res.status(200).send(foundDeposit)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

depositRouter.post("/", async(req, res, next) => {
    try{
        req.body.userId = req.auth._id
        const newDeposit = new Deposit(req.body)
        const savedDeposit = await newDeposit.save()        
        return res.status(200).send(savedDeposit)
    } catch (err){
        res.status(500)
        return next(err)
    }
})

depositRouter.delete("/:depositId" , async (req, res, next) => {
    try {
        const depositId = req.params.depositId
        const deletedDeposit = await Deposit.findByIdAndDelete(depositId)
        return res.status(200).send(`Successfully deleted ${deletedDeposit.title}`)  
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

depositRouter.put("/:depositId", async(req, res, next) => {
    try {
     const depositId = req.params.depositId
     const updatedDeposit = await Deposit.findByIdAndUpdate(
       depositId,
       req.body,
       {new:true}
     )
     return res.status(200).send(updatedDeposit)
    } catch (err) {
     res.status(500)
     return next(err)
    }     
   })

module.exports = depositRouter