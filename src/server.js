require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const productsRoutes = require("./routes/productsRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");

if (!process.env.JWT_PRIVATE_KEY) {
	console.log("FATAL ERROR: JWT private key is not defined");
	process.exit(1);
}
const port = process.env.PORT || 5000;
connectDB();
app.use(express.json());

app.use("/products", productsRoutes);
app.use("/user", userRoutes);
app.use(errorHandler);

app.listen(port, () =>
	console.log(`Server running in ${app.get("env")} mode on port ${port}`)
);
