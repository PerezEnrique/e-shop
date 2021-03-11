import "./App.css";
import { Switch, Route } from "react-router-dom";
import Header from "../src/components/Header";
import HomePage from "./pages/HomePage";
import SingleProduct from "./pages/SingleProduct";
import CartPage from "./pages/CartPage";

function App() {
	return (
		<div>
			<Header />
			<Switch>
				<Route path="/product/:id" component={SingleProduct} />
				<Route path="/cart" component={CartPage} />
				<Route exact path="/" component={HomePage} />
			</Switch>
		</div>
	);
}

export default App;
