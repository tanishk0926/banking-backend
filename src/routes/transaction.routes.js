const {Router} = require("express")
const authMiddleware = require("../middleware/auth.middleware.js")
const transactionController = require("../controllers/transaction.controller.js")



const transactionRoutes = Router();

/**
 * - POST /api/transactions
 * - Create new transaction
 */

transactionRoutes.post("/" , authMiddleware.authMiddleware , transactionController.createTransaction)

/**
 * - POST /api/transaction/system/initial-funds
 * - Create initial transactions form system user
 */
transactionRoutes.post("/system/initial-funds" , authMiddleware.authSystemUserMiddleware , transactionController.createInitialFundsTransaction)





module.exports = transactionRoutes; 