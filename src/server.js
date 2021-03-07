require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const productsRoutes = require("./routes/productsRoutes");
const errorHandler = require("./middlewares/errorHandler");

const port = process.env.PORT || 5000;
app.use(express.json());
connectDB();

app.use("/products", productsRoutes);
app.use(errorHandler);

app.listen(port, () =>
	console.log(`Server running in ${app.get("env")} mode on port ${port}`)
);
