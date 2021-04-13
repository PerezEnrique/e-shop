import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import generateStore from "./state_management/store";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

(function () {
	const store = generateStore();

	ReactDOM.render(
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>,
		document.getElementById("root")
	);
})();
