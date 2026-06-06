const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());


/**
 * - Routes required
 */
const accountRouter = require("./routes/account.routes.js")
const  authRouter  = require("./routes/auth.routes.js");
const transactionRoutes = require("./routes/transaction.routes.js")

/**
 * - Use Routes
 */
app.use("/api/auth" , authRouter);
app.use("/api/accounts" , accountRouter);
app.use("/api/transactions", transactionRoutes);



module.exports = app;