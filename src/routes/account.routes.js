const express = require("express")
const authMiddleware = require("../middleware/auth.middleware.js")
const accountController = require("../controllers/account.controller.js")



const router = express.Router();


/**
 * - POST -  /api/accounts/
 * - Create a new account
 * - Protected routes
 */
router.post("/" , authMiddleware.authMiddleware , accountController.createAccountController );

/**
 * - GET /api/accounts/
 * - Get all accounts of logged-in user
 * - Protected routes
 */
router.get("/" , authMiddleware.authMiddleware , accountController.getUserAccountsController);


/**
 * - GET /api/accounts/balance/:accountId
 * - 
 */

router.get("/balance/:accountId" , authMiddleware.authMiddleware , accountController.getAccountsBalanceController);




module.exports = router ; 