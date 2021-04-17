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

app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/config/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/client/build")));
	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	);
}

app.use(errorHandler);

app.listen(port, () =>
	console.log(`Server running in ${app.get("env")} mode on port ${port}`)
);
