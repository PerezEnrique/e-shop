require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const path = require("path");
const usersRoutes = require("./routes/usersRoutes");
const productsRoutes = require("./routes/productsRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const errorHandler = require("./middlewares/errorHandler");

if (!process.env.JWT_PRIVATE_KEY) {
	console.log("FATAL ERROR: JWT private key is not defined");
	process.exit(1);
}
const port = process.env.PORT || 5000;
connectDB();
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);
app.use("/config/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));
app.use(errorHandler);

app.listen(port, () =>
	console.log(`Server running in ${app.get("env")} mode on port ${port}`)
);
