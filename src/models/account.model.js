const mongoose = require("mongoose")
const ledgerModel = require("../models/ledger.model.js")

const accountSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "user" , 
        required : [true , "Account must be associated with a user"] , 
        index : true 
    } , 
         status : {
         type : String,
        enum : {
           values : ["ACTIVE", "FROZEN", "CLOSED"],
           message : "Status can be either ACTIVE, FROZEN or CLOSED"
         },
           default : "ACTIVE"
},
    currency : {
        type : String , 
        required : [true , "Currency is required for creating user"] , 
        default : "INR" 
    }
} , {
    timestamps : true 
})

accountSchema.index({user : 1 , status : 1 });

/**
 * Aggregation Pipeline Flow:
 *
 * 1. $match
 *    - Select all ledger entries belonging to the current account.
 *
 * 2. $group
 *    - Sum all CREDIT amounts.
 *    - Sum all DEBIT amounts.
 *
 * 3. $project
 *    - Calculate balance:
 *      balance = totalCredit - totalDebit
 *
 * Returns:
 *    Current account balance derived from ledger entries.
 */
accountSchema.methods.getBalance = async function(){
    const balenceData = await ledgerModel.aggregate([
        { $match : {account : this._id }} , 
        {
            $group : {
                _id :  null ,
                totalDebit : {
                    $sum : {
                        $cond : [
                            { $eq : ["$type" , "DEBIT"]} ,
                            "$amount" , 
                            0
                         ] 
                    }
                } , 
                totalCredit : {
                    $sum : {
                        $cond : [
                            { $eq : ["$type" , "CREDIT"]} ,
                            "$amount" , 
                            0
                         ] 
                    }
                }
            }
        } , 
        {
            $project : {
                _id : 0 , 
                balance : {$subtract : ["$totalCredit" , "$totalDebit"]}
            }
        }
    ])
    if(balenceData.length == 0){
        return 0
    }
    return balenceData[ 0 ].balance
}


const accountModel = mongoose.model("account" , accountSchema)

module.exports = accountModel ;